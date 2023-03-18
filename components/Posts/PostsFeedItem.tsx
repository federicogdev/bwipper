import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React, { FC, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineHeart, AiOutlineMessage, AiFillHeart } from "react-icons/ai";
import Avatar from "../Avatar";

type IPostsFeedItemProps = {
  userId?: string;
  post: Record<string, any>;
};

const PostsFeedItem: FC<IPostsFeedItemProps> = ({ userId, post }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: post.id, userId });

  const goToUser = useCallback(
    //prevents event bubbling
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${post.user.id}`);
    },

    [post.user.id, router]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${post.id}`);
  }, [post.id, router]);

  const onLike = useCallback(
    //prevents event bubbling
    (event: any) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }
      toggleLike();
    },

    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!post?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(post.createdAt));
  }, [post.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <div className="flex">
          <Avatar userId={post.user.id} />
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <h1
                className="text-white text-md  font-semibold cursor-pointer hover:underline"
                onClick={goToUser}
              >
                {post.user.name}
              </h1>
              <span
                className=" text-neutral-500 text-sm cursor-pointer hidden md:block ml-1"
                onClick={goToUser}
              >
                @{post.user.username}
              </span>
            </div>

            <span className="text-neutral-500 text-sm" onClick={goToUser}>
              {createdAt} ago
            </span>
          </div>
          <div className="text-white mt-1">{post.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-orange-500">
              <AiOutlineMessage size={20} />
              <p>{post.comments?.length || 0}</p>
            </div>
            <div
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-orange-500"
              onClick={onLike}
            >
              <LikeIcon size={20} color={hasLiked ? "#f97316e6" : ""} />

              <p>{post.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsFeedItem;
