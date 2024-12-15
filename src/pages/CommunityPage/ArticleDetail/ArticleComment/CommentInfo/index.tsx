import { memo } from "react";

interface Props {
  commentCount: number;
}

function CommentInfo({ commentCount }: Props) {
  return (
    <div className="text-xl font-bold">
      <span className="text-black">댓글 </span>
      <span className="text-primary">{commentCount}</span>
    </div>
  );
}

export default memo(CommentInfo);
