function CommentInfo({ commentCount }) {
  return (
    <div className="text-xl font-bold">
      <span className="text-black">댓글 </span>
      <span className="text-primary">{commentCount}</span>
    </div>
  );
}

export default CommentInfo;
