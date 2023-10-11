import React from "react";
import { ReactComponent as Plus } from "../../../../assets/svg/plus.svg";
import { useNavigate } from "react-router-dom";

function AddPartyBtn() {
  const navigation = useNavigate();

  return (
    <div
      className="relative h-64 cursor-pointer"
      onClick={() => navigation("/party/new/1")}
    >
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-lg text-white rounded-lg bg-primary">
        <div>
          <Plus className="mx-auto" />
          <p className="text-center px-2">새로운 파티 추가하기</p>
        </div>
      </div>
    </div>
  );
}

export default AddPartyBtn;
