import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPartyRoomId } from "../../redux/modules/talkRoomSlice";
import { getPartyChatId } from "../../api/chat";
import { deleteUnLikeParty, postLikeParty } from "../../api/party";
import {
  deleteUnLikeDestination,
  postLikeDestination,
} from "../../api/destination";
import FillHeart from "../../assets/svg/FillHeart.svg";
import EmptyHeart from "../../assets/svg/EmptyHeart.svg";
import ChatBox from "../../assets/svg/EmptyChatIcon.svg";
import shareIcon from "../../assets/svg/share.svg";
import ShareModal from "./ShareModal";
import CheckModal from "../CheckModal";
import ConfirmModal from "../ConfirmModal";

function PartyIconBox({ id, type, images, name, dibs }) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [heart, setHeart] = useState(dibs);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const heartClickHandler = async () => {
    if (!user.auth) return setShowLoginModal(true);

    const isParty = type === "party";

    try {
      heart
        ? isParty
          ? await deleteUnLikeParty(id)
          : await deleteUnLikeDestination(id)
        : isParty
        ? await postLikeParty(id)
        : await postLikeDestination(id);
      setHeart(!heart);
    } catch (e) {
      console.log(e);
    }
  };

  const goPartyChat = async () => {
    try {
      const result = await getPartyChatId(id);

      if (result.statusCode !== 200) {
        setErrorMessage(result.message);
        setShowErrorModal(true);
        return;
      }

      dispatch(setPartyRoomId(result.payload.chatRoomId));
      navigation("/talk");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-end mr-1.5 mt-2 mb-4">
        {type === "party" && (
          <img className="cursor-pointer" src={ChatBox} onClick={goPartyChat} />
        )}
        <img
          className="cursor-pointer"
          src={heart ? FillHeart : EmptyHeart}
          onClick={heartClickHandler}
        />
        <img
          className="cursor-pointer"
          src={shareIcon}
          onClick={() => setShowShareModal(true)}
        />
      </div>
      <ShareModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        partyImages={images}
        partyName={name}
        type={type}
      />
      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => navigation("/login")}
      />
      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message={errorMessage}
      />
    </>
  );
}

export default PartyIconBox;
