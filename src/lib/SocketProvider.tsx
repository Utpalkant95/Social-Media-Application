"use client";

import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface Notification {
  id: string;
  message: string;
  followerId: string;
}

interface ISocketContext {
  sendFollow: (followerId: string, followedId: string) => void;
  notifications: Notification[];
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("useSocket must be used within a SocketProvider");

  return state;
};

const SocketProvider = ({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
}) => {
  const [socket, setSocket] = useState<Socket>();
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const storedData = localStorage.getItem("notifications");
    const timestamp = localStorage.getItem("notifications-timestamp");
    const now = Date.now();

    if (storedData && timestamp) {
      const dataTimestamp = parseInt(timestamp, 10);
      // Check if the stored data is older than 1 day
      if (now - dataTimestamp < 24 * 60 * 60 * 1000) {
        return JSON.parse(storedData);
      } else {
        // Clear old data
        localStorage.removeItem("notifications");
        localStorage.removeItem("notifications-timestamp");
      }
    }
    return [];
  });

  const sendFollow: ISocketContext["sendFollow"] = useCallback(
    (followerId: string, followedId: string) => {
      if (socket) {
        socket.emit("event:follow", { followerId, followedId });
      }
    },
    [socket]
  );

  const onFollowNotification = useCallback(
    (notification: { followerId: string }) => {
      console.log("You have been followed by:", notification.followerId);

      const newNotification: Notification = {
        id: Date.now().toString(), // Unique ID for each notification
        message: `You have been followed by ${notification.followerId}`,
        followerId: notification.followerId,
      };

      setNotifications((prev) => [...prev, newNotification]); // Add to state

      // Here you can trigger a notification UI or any desired effect
    },
    []
  );

  // Persist notifications in localStorage
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    localStorage.setItem("notifications-timestamp", Date.now().toString());
  }, [notifications]);

  useEffect(() => {
    const _socket = io("http://localhost:4000");

    _socket.on("connect", () => {
      console.log("Connected to WebSocket server:", _socket.id);
      _socket.emit("user:connected", userId);
    });

    _socket.on("notification:follow", onFollowNotification);

    setSocket(_socket);

    return () => {
      _socket.off("notification:follow", onFollowNotification);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, [onFollowNotification, userId]);

  return (
    <SocketContext.Provider value={{ sendFollow, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
