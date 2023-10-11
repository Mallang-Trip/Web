import React, { useEffect, useState } from "react";
import jeju1 from "../../../assets/images/제주도 이미지 3.jpg";
import jeju2 from "../../../assets/images/제주도 이미지 4.jpg";
import gangwon from "../../../assets/images/강원도 이미지.jpg";
import PartyBox from "../Atoms/PartyBox";
import AddPartyBtn from "../Atoms/AddPartyBtn";
import { getPartyList } from "../../../api/party";
import { dateToString } from "../../../utils";

// const partyData = [
//   {
//     image: jeju1,
//     name: "제주도 파티",
//     date: "4.5~4.6",
//     people: "2/4명",
//     price: "9만원~",
//   },
//   {
//     image: jeju2,
//     name: "제주의 봄 파티",
//     date: "4.5~4.6",
//     people: "2/4명",
//     price: "9만원~",
//   },
//   {
//     image: gangwon,
//     name: "강원도",
//     date: "4.5~4.6",
//     people: "2/4명",
//     price: "9만원~",
//   },
// ];

function PartyList({ region, nowDate, num, price }) {
  const [partyData, setPartyData] = useState([]);

  const getData = async () => {
    const regionQuery = region === "아무데나" ? "all" : region;
    const nowDateQuery =
      nowDate.length === 0
        ? ["all", "all"]
        : nowDate.map((item) => dateToString(item));
    const numQuery = num;
    const priceQuery = price;

    try {
      const result = await getPartyList(
        regionQuery,
        nowDateQuery,
        numQuery,
        priceQuery
      );
      setPartyData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [region, nowDate, num, price]);

  return (
    <div className="grid grid-cols-2 gap-10 px-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
      <AddPartyBtn />
      {partyData.map((item) => (
        <PartyBox key={item.partyId} party={item} />
      ))}
    </div>
  );
}

export default PartyList;
