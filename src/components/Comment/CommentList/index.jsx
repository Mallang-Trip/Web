import Down from "../../../assets/svg/Polygon 3.svg";
import Comment from "./Comment";
import { useSelector } from "react-redux";

function CommentList({ reviews, isDriver, reload, setReload }) {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="flex">
        <div className="text-lg font-bold">댓글</div>
        <div className="text-sm mt-1 ml-1.5">{reviews.length}</div>
        <img className="m-1" src={Down} />
      </div>
      {reviews.map((item) => (
        <Comment
          key={item.reviewId}
          {...item}
          isMyComment={user.userId === item.userId}
          isDriver={isDriver}
          reload={reload}
          setReload={setReload}
        />
      ))}
      <button className="text-sm text-darkgray mt-7 mb-6">댓글 더보기</button>
    </>
  );
}

export default CommentList;
