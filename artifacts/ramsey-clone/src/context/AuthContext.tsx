import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountType: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("ramsey_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, _password: string) => {
    const saved = localStorage.getItem("ramsey_user");
    if (saved) {
      const u = JSON.parse(saved);
      if (u.email === email) {
        setUser(u);
        return true;
      }
    }
    const mockUser: User = {
      firstName: "Demo",
      lastName: "User",
      email,
      phone: "(555) 123-4567",
      accountType: "Individual Trading",
    };
    setUser(mockUser);
    localStorage.setItem("ramsey_user", JSON.stringify(mockUser));
    return true;
  };

  const signup = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("ramsey_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ramsey_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
