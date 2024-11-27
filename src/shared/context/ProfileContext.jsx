import React, { createContext, useState, useContext } from 'react';
import UserService from '../services/UserService';
import { toast } from 'react-toastify';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getUserProfile } = UserService();

    const getProfile = async (userId) => {
        setLoading(true);
        try {
            const response = await getUserProfile(userId);
            console.log("response", response.data);
            setUserProfile(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Error al cargar el perfil :'(");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProfileContext.Provider value={{ getProfile, userProfile, loading }}>
            {children}
        </ProfileContext.Provider>
    );
};
