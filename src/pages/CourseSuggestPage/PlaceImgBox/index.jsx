import React from "react";
import LeftBigPicture from "../../PartyPage/Atoms/LeftBigPicture";
import RightPicture from "../../PartyPage/Atoms/RightPicture";

function PlaceImgBox() {
  return (
    <div className="grid grid-cols-2">
      <LeftBigPicture src={jeju1} name={"제주도"} />
      <RightPicture src={jeju2} name={"제주도"} />
    </div>
  );
}

export default PlaceImgBox;
