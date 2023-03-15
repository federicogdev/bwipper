import React from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Logo from "./Logo";
import SidebarLink from "./SidebarLink";
import BweepButton from "./BweepButton";

const sidebarLinks = [
  { name: "Home", href: "/", icon: BsHouseFill },
  { name: "Notifications", href: "/notifications", icon: BsBellFill },
  { name: "User", href: "/users/123", icon: FaUser },
];

const Sidebar = () => {
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-center lg:items-end">
        <div className="space-y-2 lg:w-[230px]">
          <Logo />
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              name={link.name}
            />
          ))}

          <SidebarLink
            onClick={() => console.log("logout")}
            icon={BiLogOut}
            name="Logout"
          />

          <BweepButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
