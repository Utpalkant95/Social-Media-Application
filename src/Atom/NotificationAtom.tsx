"use client";
import { getNotifications } from "@/ApiServices/UserServices";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { decodeToken, IUserInfo } from "@/helpers/userInfo";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NotificationAtom = () => {
  const user : IUserInfo | null =  decodeToken();
  const [notifications, setNotifications] = useState([]);

  const {data, isLoading} = useQuery({
    queryKey: ["notifications"],
    queryFn: () =>getNotifications(user?.userId as string),
  })

  useEffect(() => {
    const localNotifications = JSON.parse(localStorage.getItem('notifications') as string) || [];
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      ...data,
    ]);
  }, []);

  return (
    <div className="px-2 py-2">
      {notifications.map((notification) => {
        return (
          <div className="flex items-center gap-4" key={notification.id}>
            <Avatar className="w-12 h-12 border-2 border-primary">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Link href="#" className="font-medium" prefetch={false}>
                  {notification.message}
                </Link>
                <span className="text-muted-foreground">liked your post</span>
              </div>
              <div className="text-sm text-muted-foreground">4h ago</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationAtom;
