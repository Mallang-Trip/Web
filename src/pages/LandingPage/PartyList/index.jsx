import React from "react";
import jeju1 from "../../../assets/images/제주도 이미지 3.jpg";
import jeju2 from "../../../assets/images/제주도 이미지 4.jpg";
import gangwon from "../../../assets/images/강원도 이미지.jpg";
import PartyBox from "../Atoms/PartyBox";
import AddPartyBtn from "../Atoms/AddPartyBtn";

const partyData = [
  {
    image: jeju1,
    name: "제주도 파티",
    date: "4.5~4.6",
    people: "2/4명",
    price: "9만원~",
  },
  {
    image: jeju2,
    name: "제주의 봄 파티",
    date: "4.5~4.6",
    people: "2/4명",
    price: "9만원~",
  },
  {
    image: gangwon,
    name: "강원도",
    date: "4.5~4.6",
    people: "2/4명",
    price: "9만원~",
  },
];

function PartyList() {
  return (
    <div className="grid grid-cols-2 gap-10 px-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
      <AddPartyBtn />
      {partyData.map((item) => (
        <PartyBox key={item.name} party={item} />
      ))}
    </div>
  );
}

export default PartyList;
