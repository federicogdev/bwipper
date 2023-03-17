import usePosts from "@/hooks/usePosts";
import React, { FC } from "react";
import PostsFeedItem from "./PostsFeedItem";

interface IPostsFeedProps {
  userId?: string;
}

const PostsFeed: FC<IPostsFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostsFeedItem userId={userId as string} post={post} key={post.id} />
      ))}
    </>
  );
};

export default PostsFeed;
