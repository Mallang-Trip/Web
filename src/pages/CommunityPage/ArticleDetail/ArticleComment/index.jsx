import CommentInfo from "./CommentInfo";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

function ArticleComment({ comments, getArticleDetailFunc }) {
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

export default ArticleComment;
