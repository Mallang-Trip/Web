import { useState } from "react";
import { useSelector } from "react-redux";
import { deleteComment } from "../../../api/driver";
import { deleteDestinationComment } from "../../../api/destination";
import Comment from "./Comment";
import CheckModal from "../../CheckModal";

function CommentList({ reviews, isDriver, reloadData }) {
  const user = useSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const deleteCommentHandler = async () => {
    try {
      if (isDriver) await deleteComment(deleteTargetId);
      else await deleteDestinationComment(deleteTargetId);

      reloadData();
      setShowDeleteModal(false);
    } catch (e) {
      console.log(e);
    }
  };

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
          setShowDeleteModal={setShowDeleteModal}
          setDeleteTargetId={setDeleteTargetId}
        />
      ))}
      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message="댓글을 삭제하시겠습니까?"
        noText="취소"
        yesText="확인"
        yesHandler={deleteCommentHandler}
      />
    </div>
  );
}

export default CommentList;
