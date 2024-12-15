import { memo, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPartyRoomId } from "../../../redux/modules/talkRoomSlice";
import { RootState } from "../../../redux/store";
import { makeNewCoupleChat } from "../../../api/chat";
import ChatBox from "../../../assets/svg/EmptyChatIcon.svg";
import shareIcon from "../../../assets/svg/share.svg";
import CheckModal from "../../../components/CheckModal";
import ShareModal from "./ShareModal";

interface Props {
  images: string[];
  name: string;
  introduction: string;
}

function IconBox({ images, name, introduction }: Props) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { driverId } = useParams();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const goDriverChat = useCallback(async () => {
    if (!user.auth) return setShowLoginModal(true);

    try {
      const result = await makeNewCoupleChat(driverId);
      dispatch(setPartyRoomId(result.payload.chatRoomId));
      navigation("/talk");
    } catch (e) {
      console.log(e);
    }
  }, [user, driverId]);

  return (
    <>
      <div className="flex gap-2 justify-end mr-1.5 mt-2 mb-4">
        <img className="cursor-pointer" src={ChatBox} onClick={goDriverChat} />
        <img
          className="cursor-pointer"
          src={shareIcon}
          onClick={() => setShowShareModal(true)}
        />
      </div>

      <ShareModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        images={images}
        name={name}
        introduction={introduction}
      />
      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText="취소"
        yesText="확인"
        yesHandler={() => navigation("/login")}
      />
    </>
  );
}

export default memo(IconBox);
