import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) return { score: 0, text: '' };
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let text = '';
    if (score <= 2) text = 'Weak';
    else if (score <= 3) text = 'Fair';
    else if (score <= 4) text = 'Good';
    else text = 'Strong';

    return { score, text };
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        return value.length < 3 ? 'Username must be at least 3 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
      case 'password':
        return value.length < 8 ? 'Password must be at least 8 characters' : '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      case 'phone':
        return value && !/^\+?[\d\s-]{10,}$/.test(value) ? 'Invalid phone number' : '';
      default:
        return value.trim() === '' ? 'This field is required' : '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
      if (formData.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: value !== formData.confirmPassword ? 'Passwords do not match' : ''
        }));
      }
    }
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    let isValid = true;
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await registerWithEmail(formData);
      toast({
        title: "Account Created!",
        description: "Welcome to ShopHub! You have been logged in."
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive"
      });
      if (error.message.toLowerCase().includes('email')) {
        setErrors(prev => ({ ...prev, email: error.message }));
      }
      if (error.message.toLowerCase().includes('username')) {
        setErrors(prev => ({ ...prev, username: error.message }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStrengthColor = (score) => {
    switch(score) {
      case 0: return 'bg-gray-200';
      case 1: case 2: return 'bg-red-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-blue-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - Tech Store</title>
        <meta name="description" content="Register a new account on ShopHub" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-muted/30">
        <Header />

        <main className="flex-1 flex items-center justify-center p-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card w-full max-w-2xl p-8 rounded-2xl border shadow-sm"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Fill in your details below to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <input
                    id="firstName" name="firstName" type="text" required
                    value={formData.firstName} onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-primary'}`}
                  />
                  {errors.firstName && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <input
                    id="lastName" name="lastName" type="text" required
                    value={formData.lastName} onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-primary'}`}
                  />
                  {errors.lastName && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <input
                    id="username" name="username" type="text" required
                    value={formData.username} onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.username ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-primary'}`}
                  />
                  {errors.username && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.username}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <input
                    id="dateOfBirth" name="dateOfBirth" type="date" required
                    value={formData.dateOfBirth} onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-primary'}`}
                  />
                  {errors.dateOfBirth && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.dateOfBirth}</p>}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <input
                    id="email" name="email" type="email" required
                    value={formData.email} onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-primary'}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <input
                    id="phone" name="phone" type="tel" required
                    value={formData.phone} onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-primary'}`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <input
                  id="address" name="address" type="text" required
                  value={formData.address} onChange={handleChange}
                  placeholder="Street, City, State, ZIP"
                  className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.address ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-primary'}`}
                />
                {errors.address && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.address}</p>}
              </div>

              {/* Security */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <input
                    id="password" name="password" type="password" required
                    value={formData.password} onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-primary'}`}
                  />
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Strength: {passwordStrength.text}</span>
                      </div>
                      <div className="flex gap-1 h-1.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div 
                            key={i} 
                            className={`flex-1 rounded-full ${i <= passwordStrength.score ? getStrengthColor(passwordStrength.score) : 'bg-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <input
                    id="confirmPassword" name="confirmPassword" type="password" required
                    value={formData.confirmPassword} onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-primary'}`}
                  />
                  {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-xs text-green-500 flex items-center mt-1"><CheckCircle2 className="h-3 w-3 mr-1"/>Passwords match</p>
                  )}
                  {errors.confirmPassword && <p className="text-xs text-red-500 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.confirmPassword}</p>}
                </div>
              </div>

              <Button type="submit" className="w-full mt-8" size="lg" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Account
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </p>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}