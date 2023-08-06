import LeftBigPicture from "../Atoms/LeftBigPicture";
import RightPicture from "../Atoms/RightPicture";

import React from "react";

function PartyBigBox() {
  return (
    <div className="grid grid-cols-2">
      <LeftBigPicture />
      <RightPicture />
    </div>
  );
}

export default PartyBigBox;
