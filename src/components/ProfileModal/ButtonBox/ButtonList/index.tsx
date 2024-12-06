import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getChatBlockList, makeNewCoupleChat } from "../../../../api/chat";
import { setPartyRoomId } from "../../../../redux/modules/talkRoomSlice";
import CheckModal from "../../../CheckModal";
import ConfirmModal from "../../../ConfirmModal";
import ReportModal from "../../../ReportModal";
import Button from "./Button";
import BlockModal from "./BlockModal";

interface Props {
  userId: number | undefined;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  nickname: string | undefined;
  chatRoomId: number | undefined;
}

function ButtonList({ userId, setShowModal, nickname, chatRoomId }: Props) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isChatBlock, setIsChatBlock] = useState(false);

  const goCoupleChat = useCallback(async () => {
    if (!user.auth) return setShowLoginModal(true);
    if (isChatBlock) return setShowErrorModal(true);

    try {
      const result = await makeNewCoupleChat(userId);
      dispatch(setPartyRoomId(result.payload.chatRoomId));
      setShowModal(false);
      navigation("/talk");
    } catch (e) {
      console.log(e);
    }
  }, [user, isChatBlock, userId]);

  const blockClickHandler = useCallback(() => {
    if (!user.auth) return setShowLoginModal(true);
    setShowBlockModal(true);
  }, [user]);

  const checkChatBlock = useCallback(async () => {
    if (!user.auth) return setIsChatBlock(false);

    try {
      const result = await getChatBlockList();
      setIsChatBlock(
        result.payload.some(
          (item: { userId: number | undefined }) => item.userId === userId
        )
      );
    } catch (e) {
      console.log(e);
    }
  }, [user, userId]);

  useEffect(() => {
    checkChatBlock();
  }, []);

  return (
    <>
      <div className="flex justify-center flex-wrap gap-3 mb-12">
        <Button name="채팅하기" type="primary" onClick={goCoupleChat} />
        {chatRoomId && (
          <Button
            name="신고하기"
            type="primary"
            onClick={() => setShowReportModal(true)}
          />
        )}
        <Button
          name={isChatBlock ? "차단해제" : "차단하기"}
          type="primary"
          onClick={blockClickHandler}
        />
      </div>

      <BlockModal
        showModal={showBlockModal}
        setShowModal={setShowBlockModal}
        isChatBlock={isChatBlock}
        setIsChatBlock={setIsChatBlock}
        userId={userId}
        nickname={nickname}
      />
      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message={
          "차단한 유저와 채팅을 할 수 없습니다.\n\n차단을 해제한 후에 다시 시도해주세요."
        }
      />
      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText="취소"
        yesText="확인"
        yesHandler={() => navigation("/login")}
      />
      <ReportModal
        showModal={showReportModal}
        setShowModal={setShowReportModal}
        reporteeId={userId}
        targetId={chatRoomId}
        type="CHAT"
      />
    </>
  );
}

export default memo(ButtonList);
