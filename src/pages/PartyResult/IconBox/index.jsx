import React from "react";
import Heart from "../../../assets/svg/EmptyHeart.svg";
import ChatBox from "../../../assets/svg/EmptyChatIcon.svg";
import shareIcon from "../../../assets/svg/share.svg";

function IconBox() {
  return (
    <div className="flex gap-1.5 justify-end mr-1.5 mt-2">
      <img className="" src={Heart} />
      <img className="" src={ChatBox} />
      <img className="" src={shareIcon} />
    </div>
  );
}

export default IconBox;
