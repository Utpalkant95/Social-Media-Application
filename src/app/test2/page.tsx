"use client";
import { useSocket } from "@/lib/SocketProvider";
import React from "react"; // Adjust the path as necessary

const NotificationList = () => {
  const { notifications } = useSocket();

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification.id}>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
