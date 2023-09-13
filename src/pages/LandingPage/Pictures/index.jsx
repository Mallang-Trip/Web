import React from "react";
import ulung from "../../../assets/images/울릉도 이미지.jpg";
import jeju from "../../../assets/images/제주도 이미지.jpg";
import gangwon from "../../../assets/images/강원도 이미지.jpg";
import Travel from "../Travel";

function Pictures() {
  return (
    <div className=" grid grid-cols-3 gap-10 mx-auto px-6">
      <Travel src={ulung} name={"울릉도"} />
      <Travel src={jeju} name={"제주도"} />
      <Travel src={gangwon} name={"강원도"} />
    </div>
  );
}

export default Pictures;
