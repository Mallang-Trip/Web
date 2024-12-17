import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteComment } from "@/api/driver";
import { deleteDestinationComment } from "@/api/destination";
import { Review } from "@/types";
import { CheckModal } from "@/components";
import Comment from "./Comment";

interface Props {
  reviews: Review[];
  isDriver: boolean;
  reloadData: () => void;
}

function CommentList({ reviews, isDriver, reloadData }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const deleteCommentHandler = useCallback(async () => {
    if (deleteTargetId === null) return;
    try {
      if (isDriver) await deleteComment(deleteTargetId);
      else await deleteDestinationComment(deleteTargetId);

      reloadData();
      setShowDeleteModal(false);
    } catch (e) {
      console.log(e);
    }
  }, [isDriver, deleteTargetId]);

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
          isMyComment={user.auth && user.userId === item.userId}
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

export default memo(CommentList);
