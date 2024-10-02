"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketProvider {
  children?: ReactNode;
  userId : string;
}

interface ISocketContext {
  sendFollowNotification: (followedUserId: string, followerUserId: string) => any;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("useSocket must be used within a SocketProvider");
  return state;
};

const SocketProvider = ({ children, userId }: ISocketProvider) => {
  const [socket, setSocket] = useState<Socket>();

  // Emit follow notification to the server
  const sendFollowNotification: ISocketContext["sendFollowNotification"] = useCallback(
    (followedUserId: string, followerUserId: string) => {
      if (socket) {
        socket.emit("event:Follow", { followedUserId, followerUserId });
      }
    },
    [socket] 
  );

  const onFollowNotificationReceive = useCallback((data: { message: string }) => {
    console.log("Follow Notification received:", data.message);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:4000");
  
    // Send the userId when the socket connects
    _socket.on("connect", () => {
      console.log("Socket connected, sending userId:", userId);
      if (userId) {
        _socket.emit("user:connected", userId);
      }
    });
  
    _socket.on("event:Notification", onFollowNotificationReceive);
  
    setSocket(_socket);
  
    return () => {
      _socket.disconnect();
      _socket.off("event:Notification", onFollowNotificationReceive);
      setSocket(undefined);
    };
  }, [onFollowNotificationReceive]);

  const socketContextValue = {
    sendFollowNotification,
  };

  return <SocketContext.Provider value={socketContextValue}>{children}</SocketContext.Provider>;
};

export default SocketProvider;