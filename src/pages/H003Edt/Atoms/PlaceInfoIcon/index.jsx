import React from "react";
import Heart from "../../../../assets/svg/EmptyHeart.svg";
import shareIcon from "../../../../assets/svg/share.svg";

function PlaceInfoIcon() {
  return (
    <div className="flex gap-1.5 justify-end mr-1.5 mt-2">
      <img className="" src={Heart} />
      <img className="" src={shareIcon} />
    </div>
  );
}

export default PlaceInfoIcon;
