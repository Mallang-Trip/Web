import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPartyRoomId } from "@/redux/modules/talkRoomSlice";
import { dateToGapKorean } from "@/utils";
import { deleteMyReply } from "@/api/article";
import { makeNewCoupleChat } from "@/api/chat";
import { RootState } from "@/redux/store";
import { Reply } from "@/types";
import { CheckModal, ReportModal } from "@/components";
import basicProfileImage from "@/assets/images/profileImage.png";

interface Props extends Reply {
  getArticleDetailFunc: () => void;
  setShowLoginModal: Dispatch<SetStateAction<boolean>>;
}

function ReplyItem({
  getArticleDetailFunc,
  setShowLoginModal,
  replyId,
  profileImg,
  nickname,
  createdAt,
  content,
  userId,
  deleted,
}: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const { articleId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

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

  const deleteHandler = useCallback(async () => {
    try {
      await deleteMyReply(replyId);
      setShowDeleteModal(false);
      getArticleDetailFunc();
    } catch (e) {
      console.log(e);
    }
  }, [replyId]);

  return (
    <>
      <div className="py-5">
        <div className="flex gap-2.5">
          <img
            src={profileImg || basicProfileImage}
            alt={nickname}
            className="w-10 h-10 rounded-full"
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
          <div className="flex gap-8 text-xs text-darkgray">
            {user.userId !== userId && (
              <>
                <button onClick={goCoupleChat}>채팅 보내기</button>
                <button onClick={() => setShowReportModal(true)}>신고</button>
              </>
            )}
            {(user.userId === userId || user.isAdmin) && !deleted && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-[#ff0000]"
              >
                삭제
              </button>
            )}
          </div>
        </div>
      </div>

      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message="답글을 삭제하시겠습니까?"
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
    </>
  );
}

export default memo(ReplyItem);
