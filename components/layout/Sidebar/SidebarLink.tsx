import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";

interface SidebarLinkProps {
  name: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  name,
  icon: Icon,
  href,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center">
      <div
        className="
        relative
        rounded-full        
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      "
      >
        <Icon size={28} color="white" />
      </div>
      <div
        className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full       
      hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      "
      >
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{name}</p>
      </div>
    </div>
  );
};

export default SidebarLink;