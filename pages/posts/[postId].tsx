import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentsFeed from "@/components/Posts/CommentsFeed";
import PostsFeedItem from "@/components/Posts/PostsFeedItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {};

const PostDetailsPage = (props: Props) => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="h-full justify-center items-center flex">
        <ClipLoader color="#f97316e6" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header title="Bweep" showBackIcon />
      <PostsFeedItem post={fetchedPost} />
      <Form
        isComment
        postId={postId as string}
        placeholder="Bweep your reply"
      />
      <CommentsFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostDetailsPage;
