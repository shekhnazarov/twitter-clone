"use client";

import { Bell, Home, User } from "lucide-react";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session, status }: any = useSession();
  const sidebarItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      label: "Notifications",
      path: `/notifications/${
        status === "authenticated" && session?.currentUser._id
      }`,
      icon: Bell,
    },
    {
      label: "Profile",
      path: `/profile/${
        status === "authenticated" && session?.currentUser._id
      }`,
      icon: User,
    },
  ];
  return <div>Sidebar</div>;
};

export default Sidebar;
