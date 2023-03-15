import { useRouter } from "next/router";
import React, { FC, useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface IHeaderProps {
  title: string;
  showBackIcon?: boolean;
}

const Header: FC<IHeaderProps> = ({ title, showBackIcon }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackIcon && (
          <BiArrowBack
            onClick={handleBack}
            color="white"
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-white text-xl font-semibold">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
