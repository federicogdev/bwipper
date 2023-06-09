import React from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Logo from "./Logo";
import SidebarLink from "./SidebarLink";
import BweepButton from "./BweepButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const sidebarLinks = [
    { name: "Home", href: "/", icon: BsHouseFill },
    {
      name: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      needsAuth: true,
      alert: currentUser?.hasNotification,
    },
    {
      name: "User",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      needsAuth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full  md:pr-6 ">
      <div className="flex flex-col items-center ">
        <div className="space-y-2 lg:w-[230px]">
          <Logo />
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              name={link.name}
              needsAuth={link.needsAuth}
              alert={link.alert}
            />
          ))}

          {currentUser && (
            <SidebarLink
              onClick={() => signOut()}
              icon={BiLogOut}
              name="Logout"
            />
          )}
          <BweepButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
