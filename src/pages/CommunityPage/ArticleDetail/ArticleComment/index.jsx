import CommentInfo from "./CommentInfo";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

function ArticleComment({ comments, reloadArticle }) {
  return (
    <div className="py-9">
      <CommentInfo commentCount={comments.length} />
      <CommentForm reloadArticle={reloadArticle} />
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          reloadArticle={reloadArticle}
          {...comment}
        />
      ))}
    </div>
  );
}

export default ArticleComment;
