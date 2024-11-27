import { useContext, useEffect } from "react";
import { NotificationContext } from "../../../shared/context/NotificationContext";
import styles from "../styles/Notification.module.css";

const Notification = () => {
  const { notifications, fetchNotifications } = useContext(NotificationContext);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className={styles.pageContainer}>

      <div className={styles.notificationsList}>
        {notifications.length === 0 ? (
          <p>No tienes notificaciones.</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification._id} className={styles.notification}>
              <p>
                <strong>{notification.fromUserId?.username}</strong>:{" "}
                {notification.message}
              </p>
              {notification.postId?.imageUrl && (
                <img
                  src={notification.postId.imageUrl}
                  alt="Imagen relacionada"
                  className={styles.notificationImage}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
