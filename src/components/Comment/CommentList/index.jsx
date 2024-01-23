import Comment from "./Comment";
import { useSelector } from "react-redux";

function CommentList({ reviews, isDriver, reloadData }) {
  const user = useSelector((state) => state.user);

  return (
    <div className="my-7">
      <div className="flex gap-1.5 items-center">
        <div className="text-lg font-bold">댓글</div>
        <div className="text-sm font-medium">{reviews.length}</div>
      </div>
      {reviews.map((item) => (
        <Comment
          key={item.reviewId}
          {...item}
          isMyComment={user.userId === item.userId}
          isDriver={isDriver}
          reloadData={reloadData}
        />
      ))}
    </div>
  );
}

export default CommentList;
