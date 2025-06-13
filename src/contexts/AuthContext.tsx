import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebase';

// Context の型定義
interface AuthContextType {
  user: User | null;
  loading : boolean;
}

// AuthProviderのpropsの型定義
interface AuthProviderProps {
  children: ReactNode;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined); //contextを作る

export function useAuthContext() { //作ったcontextを使えるようにする
    const context = useContext(AuthContext); 
    if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children } : AuthProviderProps) { 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const value: AuthContextType = {
    user,
    loading
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user: User | null) => {
      console.log(user);
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;  //AuthContextのproviderで{value}を{children}に提供する
}

