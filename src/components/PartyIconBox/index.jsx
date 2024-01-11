import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

function PartyIconBox({ id, type, images, name, dibs }) {
  const navigation = useNavigate();
  const user = useSelector((state) => state.user);
  const [heart, setHeart] = useState(dibs);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const heartClickHandler = async () => {
    if (!user.auth) return setShowLoginModal(true);

    if (type === "destination") {
      try {
        heart
          ? await deleteUnLikeDestination(id)
          : await postLikeDestination(id);
        setHeart(!heart);
      } catch (e) {
        console.log(e);
      }
    } else {
      setHeart(!heart);
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-end mr-1.5 mt-2 mb-4">
        <img className="cursor-pointer" src={ChatBox} />
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

export default PartyIconBox;
