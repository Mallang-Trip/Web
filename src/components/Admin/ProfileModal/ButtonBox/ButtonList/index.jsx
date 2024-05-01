import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getChatBlockList, makeNewCoupleChat } from "../../../../../api/chat";
import { setPartyRoomId } from "../../../../../redux/modules/talkRoomSlice";
import CheckModal from "../../../../CheckModal";
import Button from "./Button";
import BlockModal from "./BlockModal";
import ConfirmModal from "../../../../ConfirmModal";

function ButtonList({
  userId,
  setShowModal,
  nickname,
  setShowSuspensionModal,
}) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isChatBlock, setIsChatBlock] = useState(false);

  const goCoupleChat = async () => {
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
  };

  const checkChatBlock = async () => {
    if (!user.auth) return setIsChatBlock(false);

    try {
      const result = await getChatBlockList();
      setIsChatBlock(result.payload.some((item) => item.userId === userId));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkChatBlock();
  }, []);

  return (
    <>
      <div className="flex justify-center flex-wrap gap-3 mb-12 w-96">
        <Button name="채팅하기" onClick={goCoupleChat} />
        <Button name="예약 내역" />
        <Button
          name="제재하기"
          onClick={() => {
            setShowSuspensionModal(true);
            setShowModal(false);
          }}
          type="red"
        />
        <Button name="작성 글" />
        <Button name="톡 내역" />
        <Button name="작성 리뷰" />
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
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => navigation("/login")}
      />
    </>
  );
}

export default ButtonList;
