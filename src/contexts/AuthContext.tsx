
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { cleanupAuthState } from '../utils/authCleanup';

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isCustomer: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error?: any }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isCustomer = profile?.role === 'customer' || profile?.role === 'user';

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoggedIn(!!session?.user);
        
        if (session?.user) {
          // Create a basic profile from the user data
          setProfile({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name,
            role: 'user'
          });
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoggedIn(!!session?.user);
      
      if (session?.user) {
        setProfile({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name,
          role: 'user'
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: name ? { name } : undefined,
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Legacy login method for backward compatibility
  const login = (email: string, password: string): boolean => {
    if (email === 'aniketh@optra.me' && password === 'Lendmybooks') {
      setIsLoggedIn(true);
      // Fix: Cast to unknown first to avoid TypeScript error
      const mockUser = {
        id: '1',
        email,
        aud: 'authenticated',
        role: 'authenticated',
        email_confirmed_at: new Date().toISOString(),
        phone: '',
        confirmed_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString(),
        app_metadata: {},
        user_metadata: { name: 'Aniketh' },
        identities: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as unknown as User;
      
      setUser(mockUser);
      setProfile({ id: '1', email, name: 'Aniketh', role: 'admin' });
      localStorage.setItem('optra-auth', JSON.stringify({ email, timestamp: Date.now() }));
      return true;
    }
    return false;
  };

  const logout = async () => {
    try {
      cleanupAuthState();
      await supabase.auth.signOut({ scope: 'global' });
      setIsLoggedIn(false);
      setUser(null);
      setProfile(null);
      setSession(null);
      localStorage.removeItem('optra-auth');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      profile, 
      session, 
      isCustomer, 
      login, 
      logout, 
      signIn, 
      signUp 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
