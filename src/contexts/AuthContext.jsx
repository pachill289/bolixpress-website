import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
let app, auth;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.warn('Firebase not configured. Using mock auth for development.');
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check localStorage first for local users
    const localUser = localStorage.getItem('currentUser');
    if (localUser) {
      setCurrentUser(JSON.parse(localUser));
      setLoading(false);
      return;
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const mappedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          authProvider: 'google'
        };
        setCurrentUser(mappedUser);
        localStorage.setItem('currentUser', JSON.stringify(mappedUser));
      }
      setLoading(false);
      setError(null);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    if (!auth) {
      const mockUser = {
        uid: 'mock-google-123',
        email: 'google@example.com',
        displayName: 'Google Demo User',
        photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Google',
        authProvider: 'google'
      };
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      return mockUser;
    }

    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const mappedUser = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        authProvider: 'google'
      };
      localStorage.setItem('currentUser', JSON.stringify(mappedUser));
      setCurrentUser(mappedUser);
      return mappedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const registerWithEmail = async (userData) => {
    try {
      setError(null);
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.find(u => u.email === userData.email)) {
        throw new Error('An account with this email already exists');
      }
      if (users.find(u => u.username === userData.username)) {
        throw new Error('This username is already taken');
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(userData.password, salt);

      const newUser = {
        id: `usr_${Date.now()}`,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        dateOfBirth: userData.dateOfBirth,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        authProvider: 'local'
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const sessionUser = { ...newUser };
      delete sessionUser.password;
      
      setCurrentUser(sessionUser);
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
      return sessionUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      setError(null);
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }

      const sessionUser = { ...user };
      delete sessionUser.password;

      setCurrentUser(sessionUser);
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
      return sessionUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      if (auth && currentUser?.authProvider === 'google') {
        await signOut(auth);
      }
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    currentUser,
    loginWithGoogle,
    registerWithEmail,
    loginWithEmail,
    logout,
    loading,
    error,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}