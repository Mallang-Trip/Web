import React from "react";
import jeju1 from "../../../assets/images/제주도 이미지 3.jpg";

function RightPicture() {
  return (
    <div dir="rtl" className=" grid grid-cols-2">
      <img
        className="rounded-tr-[40px] object-cover"
        src={jeju1}
        name={"제주도 파티"}
        alt="picture"
      />
      <img className="" src={jeju1} name={"제주의 봄 파티"} />
      <img className="rounded-br-[40px]" src={jeju1} name={"제주의 봄 파티"} />
      <img className="" src={jeju1} name={"제주의 봄 파티"} />
    </div>
  );
}

export default RightPicture;
