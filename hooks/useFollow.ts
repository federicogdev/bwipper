import axios from "axios";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  //gets session user
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  //gets user from useFollow parameters
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  //determines if the session user has the userId from params in his followingIds array
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    //in case user is not logged in
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      //   let request;

      //   if (isFollowing) {
      //     request = () => axios.delete("/api/follow", { data: { userId } });
      //   } else {
      //     request = () => axios.post("/api/follow", { userId });
      //   }

      const request = isFollowing
        ? //in the case of a delete req axios takes a body -> userId in a data object
          () => axios.delete("/api/follow", { data: { userId } })
        : () => axios.post("/api/follow", { userId });

      //makes the follow request be it delere or post
      await request();
      //revalidates current user
      mutateCurrentUser();
      //revalidates current user
      mutateFetchedUser();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModal,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
