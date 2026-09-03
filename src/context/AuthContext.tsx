import { createContext,useContext,useState,useEffect } from "react";
import type{ReactNode} from 'react'
import type{User} from '../types/index.js'
import * as authApi from "../api/auth.js"

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (email: string, password : string) => Promise<User>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children} : {children :ReactNode}){
    const [user, setUser] = useState<User | null>(null)
    const[loading,setLoading] = useState(true);

    useEffect(() => {
        authApi.getMe().then((result) => setUser (result.user)).catch(() => setUser(null)).finally(() => setLoading(false))
    }, []);

    const login = async (email: string, password : string) => {
        const result = await authApi.login(email,password);
        setUser(result.user)
        return result.user
    }
    const logout = async () => {
        await authApi.logout();
        setUser(null)
    }
    return(
        <AuthContext.Provider value ={{user,loading,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() : AuthContextValue {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
