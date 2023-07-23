import React from "react";
import AddIcon from "@mui/icons-material/Add";

function AddPartyBtn() {
  function onClickHandler() {}
  return (
    <div className="relative h-64 cursor-pointer">
      <div className="w-full h-full absolute top-0 left-0 object-cover object-center rounded-3xl overflow-hidden bg-primary" />

      <div className=" top-1/2 absolute text-lg text-white">
        <AddIcon />

        <p>새로운 파티 추가하기</p>
      </div>
    </div>
  );
}

export default AddPartyBtn;
