import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPartyRoomId } from "@/redux/modules/talkRoomSlice";
import { RootState } from "@/redux/store";
import { getChatBlockList, makeNewCoupleChat } from "@/api/chat";
import { deleteMyArticle } from "@/api/article";
import { dateToGapKorean } from "@/utils";
import { ArticleDetailType } from "@/types";
import {
  ImageBox,
  CheckModal,
  ConfirmModal,
  ProfileModal,
  ReportModal,
} from "@/components";
import ShareModal from "./ShareModal";
import ChatBox from "@/assets/svg/EmptyChatIcon.svg";
import shareIcon from "@/assets/svg/share.svg";
import MoreDot from "@/assets/svg/MoreDot.svg";
import basicProfileImage from "@/assets/images/profileImage.png";
import clsx from "clsx";

interface Props extends ArticleDetailType {
  getArticleListFunc: () => void;
}

function ArticleBody({
  articleId,
  profileImg,
  nickname,
  updatedAt,
  title,
  content,
  images,
  partyName,
  partyId,
  userId,
  getArticleListFunc,
}: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isChatBlock, setIsChatBlock] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const profileClickHandler = useCallback(() => {
    setShowProfileModal(true);
  }, []);

  const deleteArticleHandler = useCallback(async () => {
    try {
      await deleteMyArticle(articleId);
      getArticleListFunc();
      document.body.classList.remove("overflow-hidden");
      navigation("/community/main", { replace: true });
    } catch (e) {
      console.log(e);
    }
  }, [articleId, getArticleListFunc]);

  const goCoupleChat = useCallback(async () => {
    if (!user.auth) return setShowLoginModal(true);
    if (isChatBlock) return setShowBlockModal(true);

    try {
      const result = await makeNewCoupleChat(userId);
      dispatch(setPartyRoomId(result.payload.chatRoomId));
      navigation("/talk");
    } catch (e) {
      console.log(e);
    }
  }, [user, isChatBlock, userId]);

  const checkChatBlock = useCallback(async () => {
    if (!user.auth) return setIsChatBlock(false);

    try {
      const result = await getChatBlockList();
      setIsChatBlock(
        result.payload.some(
          (item: { userId: number }) => item.userId === userId
        )
      );
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  useEffect(() => {
    checkChatBlock();
  }, []);

  return (
    <>
      <div className="w-full pt-5 pb-8 border-b border-mediumgray">
        <div className="flex justify-between mb-3">
          <div className="flex gap-2.5">
            <img
              src={profileImg || basicProfileImage}
              alt="profile_image"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={profileClickHandler}
            />
            <div className="h-10 flex flex-col justify-center">
              <p className="flex items-center gap-5">
                <span className="text-sm text-black font-bold">{nickname}</span>
                <button
                  className="text-xs text-red-600 font-bold"
                  onClick={() => setShowReportModal(true)}
                >
                  신고
                </button>
              </p>
              <p className="text-sm text-boldgray font-medium">
                {dateToGapKorean(updatedAt, true)}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center relative">
            {user.userId !== userId && (
              <img
                className="cursor-pointer"
                src={ChatBox}
                onClick={goCoupleChat}
              />
            )}
            <img
              className="cursor-pointer"
              src={shareIcon}
              onClick={() => setShowShareModal(true)}
            />
            {(user.userId === userId || user.isAdmin) && (
              <img
                className="cursor-pointer"
                src={MoreDot}
                onClick={() => setShowMore(!showMore)}
              />
            )}
            <div
              className={clsx(
                "w-[100px] absolute top-11 right-2 z-10 rounded-lg bg-white text-sm shadow-sm transition-all duration-500 overflow-hidden",
                showMore ? "max-h-[100px] border border-mediumgray" : "max-h-0"
              )}
            >
              <button
                className="w-full h-[50px] rounded-t-lg text-black hover:bg-skyblue"
                onClick={() => navigation(`/community/post/${articleId}`)}
              >
                <span>수정하기</span>
              </button>
              <button
                className="w-full h-[50px] rounded-b-lg text-[#FF0000] hover:bg-skyblue"
                onClick={() => setShowDeleteModal(true)}
              >
                <span>삭제하기</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-xl text-black font-bold">{title}</p>
          <div className="w-full mt-2.5 mb-8">
            <ImageBox images={images} name={title} />
          </div>
          <p className="w-full text-base text-boldgray font-medium whitespace-pre-wrap mt-3 mb-4">
            {content}
          </p>
          {partyId && (
            <button
              className="w-80 h-12 text-white rounded-full text-sm font-bold bg-primary px-10 mx-auto mt-12"
              onClick={() => navigation(`/party/detail/${partyId}`)}
            >
              {partyName} 구경하기
            </button>
          )}
        </div>
      </div>

      <ShareModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        articleId={articleId}
        images={images}
        title={title}
        nickname={nickname}
      />
      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message="삭제하시겠습니까?"
        noText="취소"
        yesText="확인"
        yesHandler={() => deleteArticleHandler()}
      />
      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText="취소"
        yesText="확인"
        yesHandler={() => navigation("/login")}
      />
      <ConfirmModal
        showModal={showBlockModal}
        setShowModal={setShowBlockModal}
        message={"차단한 유저에게\n말랑챗을 보낼 수 없습니다."}
      />
      <ProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        userId={userId}
        driverName={false}
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

export default memo(ArticleBody);
