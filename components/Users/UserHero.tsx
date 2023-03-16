import useUser from "@/hooks/useUser";
import Image from "next/image";
import React, { FC } from "react";
import Avatar from "../Avatar";

interface IUserHeroProps {
  userId: string;
}

const UserHero: FC<IUserHeroProps> = ({ userId }) => {
  const { data: user } = useUser(userId);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <Image
            src={user.coverImage}
            alt="Cover Image"
            style={{ objectFit: "cover" }}
            fill
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
