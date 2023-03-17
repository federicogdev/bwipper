import Header from "@/components/Header";
import PostsFeed from "@/components/Posts/PostsFeed";
import UserBio from "@/components/Users/UserBio";
import UserHero from "@/components/Users/UserHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {};

const UserDetailsPage = (props: Props) => {
  const router = useRouter();

  const { userId } = router.query;
  const { data: user, isLoading, error } = useUser(userId as string);

  if (isLoading || !user) {
    return (
      <div className="h-full justify-center items-center flex">
        <ClipLoader color="#f97316e6" size={80} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full justify-center items-center flex">
        <ClipLoader color="red" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackIcon title={user?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostsFeed userId={userId as string} />
    </>
  );
};

export default UserDetailsPage;
