import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import bcrypt from "bcryptjs";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Cargar sesión al iniciar
  useEffect(() => {
    const localUser = localStorage.getItem("currentUser");

    if (localUser) {
      setCurrentUser(JSON.parse(localUser));
      setLoading(false);
    }

    // Firebase listener SOLO para Google
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const mappedUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            authProvider: "google",
          };

          setCurrentUser(mappedUser);
          localStorage.setItem("currentUser", JSON.stringify(mappedUser));
        }
        setLoading(false);
      });

      return unsubscribe;
    }

    setLoading(false);
  }, []);

  // Login con Google (Firebase real)
  const loginWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);

      const mappedUser = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        authProvider: "google",
      };

      localStorage.setItem("currentUser", JSON.stringify(mappedUser));
      setCurrentUser(mappedUser);

      return mappedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Registro local (modo demo)
  const registerWithEmail = async (userData) => {
    try {
      setError(null);

      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find((u) => u.email === userData.email)) {
        throw new Error("Email already exists");
      }

      const hashedPassword = bcrypt.hashSync(userData.password, 10);

      const newUser = {
        id: `usr_${Date.now()}`,
        ...userData,
        password: hashedPassword,
        authProvider: "local",
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      const sessionUser = { ...newUser };
      delete sessionUser.password;

      localStorage.setItem("currentUser", JSON.stringify(sessionUser));
      setCurrentUser(sessionUser);

      return sessionUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Login local (modo demo)
  const loginWithEmail = async (email, password) => {
    try {
      setError(null);

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === email);

      if (!user) throw new Error("Invalid email or password");

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) throw new Error("Invalid email or password");

      const sessionUser = { ...user };
      delete sessionUser.password;

      localStorage.setItem("currentUser", JSON.stringify(sessionUser));
      setCurrentUser(sessionUser);

      return sessionUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Logout híbrido
  const logout = async () => {
    try {
      setError(null);

      if (currentUser?.authProvider === "google" && auth) {
        await signOut(auth);
      }

      localStorage.removeItem("currentUser");
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
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
