import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebase';

// Context の型定義
interface AuthContextType {
  user: User | null;
}

// AuthProviderのpropsの型定義
interface AuthProviderProps {
  children: ReactNode;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined); //contextを作る

export function useAuthContext() { //作ったcontextを使えるようにする
  return useContext(AuthContext); 
}

export function AuthProvider({ children } : AuthProviderProps) { 
  const [user, setUser] = useState<User | null>(null);

  const value: AuthContextType = {
    user
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user: User | null) => {
      console.log(user);
      setUser(user);
    });

    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;  //AuthContextのproviderで{value}を{children}に提供する
}

