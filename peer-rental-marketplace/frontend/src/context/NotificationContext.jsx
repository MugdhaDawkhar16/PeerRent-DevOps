import { useCallback, useEffect, useState } from "react";
import { NotificationContext } from "./notification-context";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "../services/notification.service";

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = useCallback(async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadUnreadCount = useCallback(async () => {
    try {
      const response = await getUnreadCount();
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const markNotificationAsRead = async (id) => {
    try {
      await markAsRead(id);
      await Promise.all([loadNotifications(), loadUnreadCount()]);
    } catch (error) {
      console.error(error);
    }
  };

  const markEveryNotificationAsRead = async () => {
    try {
      await markAllAsRead();
      await Promise.all([loadNotifications(), loadUnreadCount()]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadNotifications();
      void loadUnreadCount();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadNotifications, loadUnreadCount]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loadNotifications,
        loadUnreadCount,
        markNotificationAsRead,
        markEveryNotificationAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
