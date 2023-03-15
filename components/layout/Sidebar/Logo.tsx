import { useRouter } from "next/router";
import React from "react";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 transition cursor-pointer"
    >
      <BsFillHandThumbsUpFill size={28} className="text-orange-500" />
    </div>
  );
};

export default Logo;
