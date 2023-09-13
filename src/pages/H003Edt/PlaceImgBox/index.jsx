import React from "react";
import LeftBigPicture from "../../PartyResult/Atoms/LeftBigPicture";
import RightPicture from "../../PartyResult/Atoms/RightPicture";

function PlaceImgBox(props) {
  return (
    <div className="grid grid-cols-2">
      <LeftBigPicture src={jeju1} name={"제주도"} />
      <RightPicture src={jeju2} name={"제주도"} />
    </div>
  );
}

export default PlaceImgBox;
