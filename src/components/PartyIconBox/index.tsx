import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteUnLikeParty, postLikeParty } from "@/api/party";
import { CheckModal } from "@/components";
import {
  deleteUnLikeDestination,
  postLikeDestination,
} from "@/api/destination";
import FillHeart from "@/assets/svg/FillHeart.svg";
import EmptyHeart from "@/assets/svg/EmptyHeart.svg";
import shareIcon from "@/assets/svg/share.svg";
import ShareModal from "./ShareModal";

interface Props {
  id: number;
  type: "party" | "destination";
  images: string[];
  name: string;
  dibs: boolean;
}

function PartyIconBox({ id, type, images, name, dibs }: Props) {
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [heart, setHeart] = useState(dibs);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const heartClickHandler = useCallback(async () => {
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
  }, [user, heart, type, id]);

  return (
    <>
      <div className="flex gap-2 justify-end mr-1.5 mt-2 mb-4">
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
        noText="취소"
        yesText="확인"
        yesHandler={() => navigation("/login")}
      />
    </>
  );
}

export default memo(PartyIconBox);
