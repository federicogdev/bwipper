import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarLinkProps {
  name: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  needsAuth?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  name,
  icon: Icon,
  href,
  onClick,
  needsAuth,
}) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
    // needsAuth coming from props . if
    if (needsAuth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [onClick, href, router, needsAuth, currentUser, loginModal]);

  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
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
        w-full
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-lg       
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
