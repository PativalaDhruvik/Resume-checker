import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAPI, registerAPI, getMeAPI, upgradePlanAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Guest credits state (default 5 free scans for unauthenticated visitors)
  const [guestCredits, setGuestCredits] = useState(() => {
    const saved = localStorage.getItem('resumai_guest_credits');
    return saved !== null ? parseInt(saved, 10) : 5;
  });

  // Save guest credits to localStorage when changed
  useEffect(() => {
    localStorage.setItem('resumai_guest_credits', guestCredits.toString());
  }, [guestCredits]);

  // Check stored JWT token on initial load
  useEffect(() => {
    const token = localStorage.getItem('resumai_jwt_token');
    if (token) {
      getMeAPI()
        .then((res) => {
          if (res.success && res.data) {
            setUser({
              id: res.data.id,
              name: res.data.name,
              email: res.data.email,
              plan: res.data.plan || 'Free Plan',
              creditsRemaining: res.data.creditsRemaining !== undefined ? res.data.creditsRemaining : 5,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${res.data.email}`,
              isAuthenticated: true,
            });
          }
        })
        .catch(() => {
          localStorage.removeItem('resumai_jwt_token');
          setUser(null);
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginAPI({ email, password });
      if (res.success && res.data) {
        const loggedUser = {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          plan: res.data.plan || 'Free Plan',
          creditsRemaining: res.data.creditsRemaining !== undefined ? res.data.creditsRemaining : 5,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${res.data.email}`,
          isAuthenticated: true,
        };
        setUser(loggedUser);
        return { success: true, user: loggedUser };
      } else {
        return { success: false, message: res.message || 'Login failed.' };
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Invalid email or password.';
      return { success: false, message };
    }
  };

  const signup = async (name, email, password, targetRole) => {
    try {
      const res = await registerAPI({ name, email, password, targetRole });
      if (res.success && res.data) {
        const newUser = {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          plan: res.data.plan || 'Free Plan',
          creditsRemaining: res.data.creditsRemaining !== undefined ? res.data.creditsRemaining : 5,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${res.data.email}`,
          isAuthenticated: true,
        };
        setUser(newUser);
        return { success: true, user: newUser };
      } else {
        return { success: false, message: res.message || 'Registration failed.' };
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed.';
      return { success: false, message };
    }
  };

  const activeCredits = user ? user.creditsRemaining : guestCredits;

  const deductCredit = (updatedCreditsFromBackend) => {
    if (user) {
      setUser((prev) => {
        if (!prev) return null;
        const newCredits = updatedCreditsFromBackend !== undefined && updatedCreditsFromBackend !== null
          ? updatedCreditsFromBackend
          : Math.max(0, prev.creditsRemaining - 1);
        return { ...prev, creditsRemaining: newCredits };
      });
    } else {
      setGuestCredits((prev) => Math.max(0, prev - 1));
    }
  };

  const upgradePlan = async (planName, newCredits) => {
    try {
      const res = await upgradePlanAPI({ planName, newCredits });
      if (res.success && res.data) {
        if (user) {
          setUser((prev) => ({
            ...prev,
            plan: res.data.plan || planName,
            creditsRemaining: res.data.creditsRemaining !== undefined ? res.data.creditsRemaining : (prev.creditsRemaining + newCredits),
          }));
        } else {
          setGuestCredits((prev) => prev + newCredits);
        }
        return { success: true };
      }
    } catch (err) {
      console.warn('[Express Auth] Upgrade plan API note:', err.message);
    }

    if (user) {
      setUser((prev) => ({
        ...prev,
        plan: planName,
        creditsRemaining: (prev?.creditsRemaining || 0) + newCredits,
      }));
    } else {
      setGuestCredits((prev) => prev + newCredits);
    }
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('resumai_jwt_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        guestCredits,
        activeCredits,
        login,
        signup,
        deductCredit,
        upgradePlan,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
