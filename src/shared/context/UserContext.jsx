import React, { createContext, useState, useContext } from 'react';
import UserService from '../services/UserService';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAllUsers } = UserService();
  const { user: authUser } = useContext(AuthContext);


  const getFriends = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      response.data.forEach(user => {
        if(user.profilePicture){
            user.profilePicture = `http://64.23.228.143:3001/${user.profilePicture}`;
        }else{
            user.profilePicture = "http://64.23.228.143:3001/uploads/default-profile.jpg";
        }
        if(user._id === authUser._id){
          setCurrentUser(user);
        }
      });
      setFriends(response.data);
    } catch (error) {
      toast.error("Error al cargar los amigos :'(");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ getFriends, friends, loading, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
