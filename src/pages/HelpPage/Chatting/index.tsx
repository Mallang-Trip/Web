import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPartyRoomId } from "@/redux/modules/talkRoomSlice";
import { makeNewCoupleChat } from "@/api/chat";
import { RootState } from "@/redux/store";
import { ConfirmModal } from "@/components";

function Chatting() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const goDriverChat = useCallback(async () => {
    if (!user.auth) return setShowLoginModal(true);
    if (user.userId === 0) return navigation("/talk");

    try {
      const result = await makeNewCoupleChat(0);
      dispatch(setPartyRoomId(result.payload.chatRoomId));
      navigation("/talk");
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  return (
    <>
      <div className="max-w-[550px] mx-auto mt-40 py-5 flex flex-col items-center gap-6 bg-skyblue rounded-xl">
        <div className="text-xl text-black font-bold">1:1 채팅상담</div>
        <div className="text-sm text-darkgray font-medium">
          채팅상담은 공휴일을 제외한 평일 10:00~18:00에 운영됩니다.
        </div>
        <button
          className="w-[120px] py-2.5 rounded-full text-sm text-white font-bold bg-primary"
          onClick={goDriverChat}
        >
          문의하기
        </button>
      </div>
      <ConfirmModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
      />
    </>
  );
}

export default memo(Chatting);
