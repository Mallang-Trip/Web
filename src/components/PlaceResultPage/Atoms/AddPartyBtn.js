import React from "react";
import { ReactComponent as Plus } from "../../../assets/svg/plus.svg";

function AddPartyBtn() {
  return (
    <div className="relative cursor-pointer">
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-lg text-white rounded-lg bg-primary">
        <div>
          <Plus className="mx-auto" />
          <p>새로운 파티 추가하기</p>
        </div>
      </div>
    </div>
  );
}

export default AddPartyBtn;
