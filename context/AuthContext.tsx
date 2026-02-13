// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api";

interface AuthContextType {
    user: any;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const saveTokens = async (access: string, refresh: string) => {
        await AsyncStorage.setItem("access", access);
        await AsyncStorage.setItem("refresh", refresh);
    };

    const logout = async () => {
        await AsyncStorage.removeItem("access");
        await AsyncStorage.removeItem("refresh");
        delete API.defaults.headers.common["Authorization"];
        setUser(null);
    };

    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem("access");
            if (!token) return;

            const res = await API.get("/me/");
            setUser(res.data);
        } catch (error) {
            console.log("FETCH USER ERROR", error);
            await logout();
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const res = await API.post("/token/", {
                username,
                password,
            });

            const { access, refresh } = res.data;

            await saveTokens(access, refresh);

            API.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${access}`;

            await fetchUser();
        } catch (error: any) {
            console.log("LOGIN ERROR:", error.response?.data);
            throw error;
        }
    };

    const register = async (
        username: string,
        email: string,
        password: string
    ) => {
        try {
            await API.post("/register/", {
                username,
                email,
                password,
            });

            // auto login după register
            await login(username, password);
        } catch (error: any) {
            console.log("REGISTER ERROR:", error.response?.data);
            throw error;
        }
    };

    useEffect(() => {
        const init = async () => {
            const token = await AsyncStorage.getItem("access");

            if (token) {
                API.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                await fetchUser();
            }

            setLoading(false);
        };

        init();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
