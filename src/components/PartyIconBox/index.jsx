import { useState } from "react";
import {
  deleteUnLikeDestination,
  postLikeDestination,
} from "../../api/destination";
import FillHeart from "../../assets/svg/FillHeart.svg";
import EmptyHeart from "../../assets/svg/EmptyHeart.svg";
import ChatBox from "../../assets/svg/EmptyChatIcon.svg";
import shareIcon from "../../assets/svg/share.svg";
import ShareModal from "./ShareModal";

function PartyIconBox({ id, type, images, name, dibs }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [heart, setHeart] = useState(dibs);

  const heartClickHandler = async () => {
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
    </>
  );
}

export default PartyIconBox;
