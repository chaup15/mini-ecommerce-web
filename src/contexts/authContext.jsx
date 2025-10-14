import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    const handleSignOut = () => {
        console.log('Signing out...');
        if(localStorage.getItem('token')) {
            localStorage.removeItem('token');
            setToken(null);
        }
    }

    useEffect(() => {
        console.log('Get token', localStorage.getItem('token'));
        if(localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, handleSignOut }}>
            {children}
        </AuthContext.Provider>
    );
}
