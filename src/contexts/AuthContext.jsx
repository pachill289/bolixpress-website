import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import {
  registerRequest,
  loginRequest,
  googleLoginRequest,
} from "@/services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión guardada
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setCurrentUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Guarda la sesión del usuario
  const saveUserLocalStorage = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setCurrentUser(user);
  };

  // Registro de usuario
  const registerWithEmail = async (userData) => {
    const data = await registerRequest(userData);
    saveUserLocalStorage(data.token, data.user);
    return data.user;
  };

  // Login con email
  const loginWithEmail = async (email, password) => {
    const data = await loginRequest(email, password);
    saveUserLocalStorage(data.token, data.user);
    return data.user ? true : false;
  };

  // Login con Google
  const loginWithGoogle = async () => {
    // Firebase popup
    const result = await signInWithPopup(auth, googleProvider);

    // Obtener idToken
    const idToken = await result.user.getIdToken();

    // Enviarlo al backend
    const data = await googleLoginRequest(idToken);

    // Guardar sesión propia (NO la de Firebase)
    saveUserLocalStorage(data.token, data.user);

    return data.user;
  };

  const logout = async () => {
    await signOut(auth); // si fue google
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        registerWithEmail,
        loginWithEmail,
        loginWithGoogle,
        logout,
        isAuthenticated: !!currentUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
