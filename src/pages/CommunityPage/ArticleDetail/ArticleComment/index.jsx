import CommentInfo from "./CommentInfo";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

function ArticleComment({ comments }) {
  return (
    <div className="py-9">
      <CommentInfo commentCount={comments.length} />
      <CommentForm />
      {comments.map((comment) => (
        <CommentItem key={comment.commentId} {...comment} />
      ))}
    </div>
  );
}

export default ArticleComment;
