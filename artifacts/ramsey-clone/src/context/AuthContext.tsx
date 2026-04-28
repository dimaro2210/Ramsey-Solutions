import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { db, User } from "@/lib/db";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: any, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Listen for changes on auth state. Supabase v2 automatically fires an INITIAL_SESSION event
    // so we don't need a separate getSession() call which causes lock stealing errors.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Defer execution to prevent deadlocking the Supabase Auth internal lock!
      // When onAuthStateChange fires, Supabase holds the token lock. Calling db.getUser() 
      // immediately forces a fetch request, which tries to acquire the same lock, causing the crash.
      setTimeout(async () => {
        if (!mounted) return;
        
        if (session?.user) {
          try {
            const dbUser = await db.getUser(session.user.id);
            if (mounted) setUser(dbUser);
          } catch (err) {
            console.error("Failed to fetch user profile", err);
            if (mounted) setUser(null);
          }
        } else {
          if (mounted) setUser(null);
        }
        if (mounted) setIsLoading(false);
      }, 0);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { success: false, error: error.message };
    }
    // The onAuthStateChange listener will automatically detect the login,
    // fetch the user from db, and update the global state. 
    // This prevents the duplicate token lock race condition.
    return { success: true };
  };

  const signup = async (userData: any, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: password,
      options: {
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName
        }
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }
    
    // Supabase Trigger will create the public.users row
    return { success: true };
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    await db.updateUser(user.id, updates);
    // Refresh user object
    const dbUser = await db.getUser(user.id);
    setUser(dbUser);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateUser, isAuthenticated: !!user, isLoading }}
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
