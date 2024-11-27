import { useState, useEffect } from "react";
import NotificationsModal from "../components/Notification";
import useNotificationService from "../../../shared/services/NotificationService";
import styles from "../styles/Notification.module.css";
import PropTypes from "prop-types";

const NotificationsPage = ({ userId, isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const { getNotifications } = useNotificationService();

  useEffect(() => {
    if (isOpen) {
      getNotifications(userId)
        .then(setNotifications)
        .catch((error) =>
          console.error("Error al cargar las notificaciones:", error)
        );
    }
  }, [isOpen, userId, getNotifications]);

  return (
    <div className={styles.pageWrapper}>
      <h1>Notificaciones</h1>
      <NotificationsModal
        userId={userId}
        onClose={onClose}
        isOpen={isOpen}
      />
    </div>
  );
};

// Validación de props
NotificationsPage.propTypes = {
  userId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationsPage;
