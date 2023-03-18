import React, { FC } from "react";
import CommentItem from "./CommentItem";

interface ICommentsFeedProps {
  comments?: Record<string, any>[];
}

const CommentsFeed: FC<ICommentsFeedProps> = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem data={comment} />
      ))}
    </>
  );
};

export default CommentsFeed;
