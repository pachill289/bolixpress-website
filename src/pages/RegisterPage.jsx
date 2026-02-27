import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  // constante t para definir el cambio de idioma
  const { t } = useTranslation();

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const validateField = (name, value) => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    switch (name) {
      case "firstName":
        if (!value.trim()) return "register_msg_9";
        if (!nameRegex.test(value)) return "register_msg_18";
        return "";

      case "lastName":
        if (!value.trim()) return "register_msg_9";
        if (!nameRegex.test(value)) return "register_msg_18";
        return "";
      case "username":
        return value.length < 3 ? "register_msg_5" : "";
      case "email":
        if (!value.trim()) return "register_msg_9";
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "register_msg_17"
          : "";
      case "password":
        return value.length < 8 ? "register_msg_6" : "";
      case "confirmPassword":
        return value !== formData.password ? "register_msg_7" : "";
      case "phone":
        if (!value.trim()) return "register_msg_9";
        if (!value.startsWith("+")) return "register_msg_22";
        return value && !/^\+?[\d\s-]{10,}$/.test(value)
          ? "register_msg_21"
          : "";
      case "dateOfBirth":
        if (!value) return "register_msg_9";

        const [year, month, day] = value.split("-").map(Number);

        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        const currentDay = today.getDate();

        let age = currentYear - year;

        if (
          currentMonth < month ||
          (currentMonth === month && currentDay < day)
        ) {
          age--;
        }

        return age < 18 ? "register_msg_19" : "";

      default:
        return value.trim() === "" ? "register_msg_9" : "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
      if (formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword:
            value !== formData.confirmPassword ? t("register_msg_7") : "",
        }));
      }
    }

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      toast({
        title: t("register_msg_10"),
        description: t("register_msg_11"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await registerWithEmail(formData);
      toast({
        title: t("register_msg_12"),
        description: t("register_msg_13"),
      });
      navigate("/");
    } catch (error) {
      toast({
        title: t("register_msg_14"),
        description: error.message || t("register_msg_15"),
        variant: "destructive",
      });
      if (error.message.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: error.message }));
      }
      if (error.message.toLowerCase().includes("username")) {
        setErrors((prev) => ({ ...prev, username: error.message }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStrengthColor = (score) => {
    switch (score) {
      case 0:
        return "bg-gray-200";
      case 1:
      case 2:
        return "bg-red-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-blue-500";
      case 5:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - Bolixpress</title>
        <meta
          name="description"
          content="Register a new account on Bolixpress"
        />
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
              <h1 className="text-3xl font-bold">{t("register_title_1")}</h1>
              <p className="text-muted-foreground mt-2 text-sm">
                {t("register_subtitle_1")}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    {t("register_label_first_name")}
                  </Label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.firstName ? "border-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-primary"}`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {t(errors.firstName)}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    {t("register_label_last_name")}
                  </Label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.lastName ? "border-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-primary"}`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {t(errors.lastName)}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">
                    {t("register_label_username")}
                  </Label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.username ? "border-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-primary"}`}
                  />
                  {errors.username && (
                    <p className="text-xs text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {t(errors.username)}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">
                    {t("register_label_date_of_birth")}
                  </Label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.dateOfBirth ? "border-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-primary"}`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-xs text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {t(errors.dateOfBirth)}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("register_label_email")}</Label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-primary"}`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {t(errors.email)}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {t("register_label_phonenumber")}
                  </Label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-primary"}`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {t(errors.phone)}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  {t("register_label_full_address")}
                </Label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t("register_placeholder_full_address")}
                  className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.address ? "border-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-primary"}`}
                />
                {errors.address && (
                  <p className="text-xs text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {t(errors.address)}
                  </p>
                )}
              </div>

              {/* Security */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {t("register_label_password")}
                  </Label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-primary"}`}
                  />
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>
                          {t("register_msg_16")}{" "}
                          {passwordStrength <= 2
                            ? t("register_msg_1")
                            : passwordStrength <= 3
                              ? t("register_msg_2")
                              : passwordStrength <= 4
                                ? t("register_msg_3")
                                : t("register_msg_4")}{" "}
                        </span>
                      </div>
                      <div className="flex gap-1 h-1.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-full ${i <= passwordStrength ? getStrengthColor(passwordStrength) : "bg-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-xs text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {t(errors.password)}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {t("register_label_password_confirm")}
                  </Label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md bg-background text-foreground outline-none transition-all ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-primary"}`}
                  />
                  {formData.confirmPassword &&
                    !errors.confirmPassword &&
                    formData.password === formData.confirmPassword && (
                      <p className="text-xs text-green-500 flex items-center mt-1">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {t("register_msg_20")}
                      </p>
                    )}
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {t(errors.confirmPassword)}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-8"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {t("button_6")}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              {t("register_subtitle_2")}{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                {t("register_subtitle_3")}
              </Link>
            </p>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
}
