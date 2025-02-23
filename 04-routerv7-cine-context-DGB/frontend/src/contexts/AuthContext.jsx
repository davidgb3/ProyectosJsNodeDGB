import { createContext, useContext, useEffect, useState } from "react";
const MONGODB_URL = import.meta.env.VITE_MONGODB_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null); 
    const [token, setToken] = useState('');

    const login = async (email, password) => {
        try {
            const response = await fetch(`${MONGODB_URL}/auth/login`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({email, password})
            });
            if(!response.ok){
                console.error('Error al iniciar sesión.');
            }
            const data = await response.json();
            console.log('Inicio de sesión con exito!', data.user.name, data.user.email);
            setUser(data.user);
            setToken(data.token);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error('Error al iniciar sesión -> ', error.message);
        }
    };

    const checkLogin = async () => {
        try {
            const response = await fetch(`${MONGODB_URL}/auth/session`,{
                method: 'GET',
                credentials: 'include',
            });
            if(!response.ok){
                throw new Error ("Error al iniciar sesión");
            }
            const data = await response.json();
            setUser(data.user);
            console.log(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.log('No hay sesión activa --> ', error.message);
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch(`${MONGODB_URL}/auth/register`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({name, email, password})
            });
            if(!response.ok){
                console.error('Error al registrar usuario.');
            }
            const data = await response.json();
            console.log('Usuario Regsitrado con exito!', data.user.name, data.user.email);
        } catch (error) {
            throw new Error('Error al registrar usuario -> ', error.message);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(`${MONGODB_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            if(!response.ok){
                throw new Error('Error a cerra sesión');
            }
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
            console.log('Session cerrada con éxito');
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            try {
                await checkLogin();
            } catch (error) {
                console.error('Error al verificar la sesión:', error);
            }
        };
        
        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, error, setError, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const contex = useContext(AuthContext);
    if(!contex){
        throw new Error();
    }
    return contex;
};