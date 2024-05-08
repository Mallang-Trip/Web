import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeNewCoupleChat } from "../../../../api/chat";
import { deleteSuspensionReport } from "../../../../api/admin";
import { setPartyRoomId } from "../../../../redux/modules/talkRoomSlice";
import CheckModal from "../../../CheckModal";
import ConfirmModal from "./ConfirmModal";
import SuspensionModal from "./SuspensionModal";
import Button from "../ButtonList/Button";

function AdminButtonList({
  userId,
  reportId,
  setShowModal,
  suspensionDuration,
  getUserInfoFunc,
}) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [showSuspensionModal, setShowSuspensionModal] = useState(false);
  const [showDeleteSuspensionModal, setShowDeleteSuspensionModal] =
    useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const goCoupleChat = async () => {
    try {
      const result = await makeNewCoupleChat(userId);
      dispatch(setPartyRoomId(result.payload.chatRoomId));
      setShowModal(false);
      navigation("/talk");
    } catch (e) {
      console.log(e);
    }
  };

  const deleteSuspensionFunc = async () => {
    try {
      await deleteSuspensionReport(reportId);
      setShowDeleteSuspensionModal(false);
      setShowConfirmModal(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex justify-center flex-wrap gap-3 mb-12 w-96">
        <Button name="채팅하기" onClick={goCoupleChat} />
        <Button name="예약 내역" onClick={() => alert("개발 X")} />
        {suspensionDuration ? (
          <Button
            name={
              suspensionDuration === -1
                ? "영구 제재"
                : `${suspensionDuration}일 제재`
            }
            onClick={() => setShowDeleteSuspensionModal(true)}
            type="red"
          />
        ) : (
          <Button
            name="제재하기"
            onClick={() => setShowSuspensionModal(true)}
            type="red"
          />
        )}
        <Button name="작성 글" onClick={() => alert("개발 X")} />
        <Button name="톡 내역" onClick={() => alert("개발 X")} />
        <Button name="작성 리뷰" onClick={() => alert("개발 X")} />
      </div>

      <SuspensionModal
        showModal={showSuspensionModal}
        setShowModal={setShowSuspensionModal}
        setShowConfirmModal={setShowConfirmModal}
        userId={userId}
        reportId={reportId}
      />
      <CheckModal
        showModal={showDeleteSuspensionModal}
        setShowModal={setShowDeleteSuspensionModal}
        message="제재를 해제하시겠습니까?"
        noText="취소"
        yesText="해제하기"
        yesHandler={deleteSuspensionFunc}
      />
      <ConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        getUserInfoFunc={getUserInfoFunc}
        message="완료되었습니다."
      />
    </>
  );
}

export default AdminButtonList;
