import React, { createContext, useState, useEffect, useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    user: { token: string } | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Lógica do context provider.
    const [user, setUser] = useState<{ token: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const loadUser = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setUser({ token });
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('token', token);
        setUser({token});
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext 
            value={{ user, login, logout, loading }}
        >
            {children}
        </AuthContext>
    );
};

export const useAuth = () => useContext(AuthContext);