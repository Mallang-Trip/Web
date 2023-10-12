import { useState } from "react";
import FillHeart from "../../assets/svg/FillHeart.svg";
import EmptyHeart from "../../assets/svg/EmptyHeart.svg";
import ChatBox from "../../assets/svg/EmptyChatIcon.svg";
import shareIcon from "../../assets/svg/share.svg";

function PartyIconBox() {
  const [heart, setHeart] = useState(false);

  return (
    <div className="flex gap-2 justify-end mr-1.5 mt-2 mb-4">
      <img className="cursor-pointer" src={ChatBox} />
      <img
        className="cursor-pointer"
        src={heart ? FillHeart : EmptyHeart}
        onClick={() => setHeart(!heart)}
      />
      <img className="cursor-pointer" src={shareIcon} />
    </div>
  );
}

export default PartyIconBox;
