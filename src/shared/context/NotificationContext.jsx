import { createContext, useState, useEffect } from "react";
import useNotificationService from "../services/NotificationService";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { getNotifications, addNotification } = useNotificationService();

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    }
  };

  const createNotification = async (notification) => {
    try {
      const newNotification = await addNotification(notification);
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    } catch (error) {
      console.error("Error al crear notificación:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        fetchNotifications,
        createNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
