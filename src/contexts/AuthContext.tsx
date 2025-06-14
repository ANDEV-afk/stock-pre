import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("stockvision_user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        localStorage.removeItem("stockvision_user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock authentication - replace with real API
          if (password.length >= 6) {
            resolve(true);
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 1500);
      });

      const userData: User = {
        id: `user_${Date.now()}`,
        email,
        firstName: email.split("@")[0],
        lastName: "User",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };

      setUser(userData);
      localStorage.setItem("stockvision_user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock registration - replace with real API
          const existingUsers = JSON.parse(
            localStorage.getItem("stockvision_registered_users") || "[]",
          );

          if (existingUsers.find((u: any) => u.email === userData.email)) {
            reject(new Error("Email already exists"));
          } else {
            resolve(true);
          }
        }, 2000);
      });

      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
      };

      // Save to "database"
      const existingUsers = JSON.parse(
        localStorage.getItem("stockvision_registered_users") || "[]",
      );
      existingUsers.push({ ...newUser, password: userData.password });
      localStorage.setItem(
        "stockvision_registered_users",
        JSON.stringify(existingUsers),
      );

      setUser(newUser);
      localStorage.setItem("stockvision_user", JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("stockvision_user");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("stockvision_user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
