import { memo } from "react";
import { Comment } from "@/types";
import CommentInfo from "./CommentInfo";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

interface Props {
  comments: Comment[];
  getArticleDetailFunc: () => void;
}

function ArticleComment({ comments, getArticleDetailFunc }: Props) {
  return (
    <div className="py-9">
      <CommentInfo commentCount={comments.length} />
      <CommentForm getArticleDetailFunc={getArticleDetailFunc} />
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          getArticleDetailFunc={getArticleDetailFunc}
          {...comment}
        />
      ))}
    </div>
  );
}

export default memo(ArticleComment);
