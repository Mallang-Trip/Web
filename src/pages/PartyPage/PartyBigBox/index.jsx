import LeftBigPicture from "../Atoms/LeftBigPicture";
import RightPicture from "../Atoms/RightPicture";
import jeju1 from "../../../assets/images/제주도 이미지 3.jpg";
import jeju2 from "../../../assets/images/제주도 이미지 3.jpg";

import React from "react";

function PartyBigBox(props) {
  return (
    <div className="grid grid-cols-2">
      <LeftBigPicture src={jeju1} name={"제주도"} />
      <RightPicture src={jeju2} name={"제주도"} />
    </div>
  );
}

export default PartyBigBox;
