import React from "react";
import jeju1 from "../../../assets/images/제주도 이미지 3.jpg";
import jeju2 from "../../../assets/images/제주도 이미지 4.jpg";
import gangwon from "../../../assets/images/강원도 이미지.jpg";

import PartyBox from "../Atoms/PartyBox";
import AddPartyBtn from "../Atoms/AddPartyBtn";

function Pictures() {
  return (
    <div className="grid grid-cols-2 gap-10 px-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
      <AddPartyBtn />
      <PartyBox src={jeju1} name={"제주도 파티"} />
      <PartyBox src={jeju2} name={"제주의 봄 파티"} />
      <PartyBox src={gangwon} name={"강원도"} />
    </div>
  );
}

export default Pictures;
