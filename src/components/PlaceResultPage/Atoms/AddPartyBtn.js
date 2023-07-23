import React from "react";
import { ReactComponent as Plus } from "../../../assets/svg/plus.svg";

function AddPartyBtn() {
  return (
    <div className="relative h-64 cursor-pointer">
      <div className="w-full h-full absolute top-0 left-0 object-cover object-center rounded-3xl overflow-hidden bg-primary" />

      <div className=" top-0 left-0 absolute text-lg text-white flex w-full h-full justify-center items-center">
        <div>
          <Plus className="mx-auto" />
          <p>새로운 파티 추가하기</p>
        </div>
      </div>
    </div>
  );
}

export default AddPartyBtn;
