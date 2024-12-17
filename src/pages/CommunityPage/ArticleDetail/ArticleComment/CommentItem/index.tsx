import { memo, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPartyRoomId } from "@/redux/modules/talkRoomSlice";
import { RootState } from "@/redux/store";
import { dateToGapKorean } from "@/utils";
import { deleteMyComment } from "@/api/article";
import { makeNewCoupleChat } from "@/api/chat";
import { Comment } from "@/types";
import { CheckModal, ReportModal } from "@/components";
import ReplyItem from "./ReplyItem";
import ReplyForm from "./ReplyForm";
import basicProfileImage from "@/assets/images/profileImage.png";
import clsx from "clsx";

interface Props extends Comment {
  getArticleDetailFunc: () => void;
}

function CommentItem({
  getArticleDetailFunc,
  commentId,
  profileImg,
  nickname,
  createdAt,
  content,
  userId,
  deleted,
  replies,
}: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { articleId } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const [showReply, setShowReply] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const deleteHandler = useCallback(async () => {
    try {
      await deleteMyComment(commentId);
      setShowDeleteModal(false);
      getArticleDetailFunc();
    } catch (e) {
      console.log(e);
    }
  }, [commentId]);

  const goCoupleChat = useCallback(async () => {
    if (!user.auth) return setShowLoginModal(true);

    try {
      const result = await makeNewCoupleChat(userId);
      dispatch(setPartyRoomId(result.payload.chatRoomId));
      navigation("/talk");
    } catch (e) {
      console.log(e);
    }
  }, [user, userId]);

  return (
    <div className="py-5">
      <div className="flex gap-2.5">
        <img
          src={profileImg || basicProfileImage}
          alt={nickname}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="h-10 flex flex-col justify-center">
          <p className="text-sm text-black font-bold">{nickname}</p>
          <p className="text-sm text-boldgray font-medium">
            {dateToGapKorean(createdAt, false)}
          </p>
        </div>
      </div>
      <div className="ml-[50px]">
        <div className="w-full text-base text-boldgray font-medium whitespace-pre-wrap mt-2.5 mb-5">
          {content}
        </div>
        <div className="flex gap-8 text-xs">
          <button
            className="text-primary"
            onClick={() => setShowReply(!showReply)}
          >{`답글 ${replies.length}개`}</button>
          {user.userId !== userId && (
            <>
              <button className="text-darkgray" onClick={goCoupleChat}>
                채팅 보내기
              </button>
              <button
                className="text-darkgray"
                onClick={() => setShowReportModal(true)}
              >
                신고
              </button>
            </>
          )}
          {(user.userId === userId || user.isAdmin) && !deleted && (
            <button
              className="text-[#ff0000]"
              onClick={() => setShowDeleteModal(true)}
            >
              삭제
            </button>
          )}
        </div>
        <div
          className={clsx(
            "w-full transition-all duration-500 overflow-hidden border-l-2 border-lightgray mt-5",
            showReply ? "max-h-[1000px] " : "max-h-0"
          )}
        >
          <div className="ml-4">
            {replies.map((reply) => (
              <ReplyItem
                key={reply.replyId}
                getArticleDetailFunc={getArticleDetailFunc}
                setShowLoginModal={setShowLoginModal}
                {...reply}
              />
            ))}
            <ReplyForm
              commentId={commentId}
              getArticleDetailFunc={getArticleDetailFunc}
            />
          </div>
        </div>
      </div>
      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message="댓글을 삭제하시겠습니까?"
        noText="취소"
        yesText="확인"
        yesHandler={() => deleteHandler()}
      />
      <ReportModal
        showModal={showReportModal}
        setShowModal={setShowReportModal}
        reporteeId={userId}
        targetId={articleId}
        type="ARTICLE"
      />
      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText="취소"
        yesText="확인"
        yesHandler={() => navigation("/login")}
      />
    </div>
  );
}

export default memo(CommentItem);
