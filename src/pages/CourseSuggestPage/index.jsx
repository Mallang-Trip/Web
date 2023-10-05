import React, { useState } from "react";
import { useParams } from "react-router-dom";
import IconBox from "../PartyPage/IconBox";
import Vector from "../../assets/images/Vector.png";
import PartyBigBox from "../PartyPage/PartyBigBox";
import FirstCredit from "../PartyPage/Atoms/FirstCredit";
import Period from "../PartyPage/Atoms/Period";
import SecondCredit from "../PartyPage/Atoms/SecondCredit";
import ToTalCredit from "../PartyPage/Atoms/ToTalCredit";
import PartyNumberBox from "./PartyNumberBox";
import TravelerBox from "./TravelerBox";
import TravelerGreet from "./Atoms/TravelerGreet";
import PlaceInfoBox from "./PlaceInfoBox";
import Detailed from "./Atoms/Detailed";
import CommentList from "./CommentList";
import AddComment from "./Atoms/AddComment";
import Credit from "./Atoms/Credit";
import BottomRefund from "../../components/BottomRefund";
import Agreement from "./AddAgree";
import SuggestButton from "./SuggestButton";
import CourseDnD from "./CourseDnD";

function CourseSuggestPage() {
  const { place } = useParams();

  const [shakeCredit, setShakeCredit] = useState(false);
  const suggestHandler = () => {
    setShakeCredit(true);
    setTimeout(() => setShakeCredit(false), 1000);
  };

  return (
<<<<<<< HEAD
    <React.Fragment>
      <div className="w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between pl-5 mx-auto overflow-hidden text-[23px] font-bold">
          {place}
        </div>
        <div className="text-gray text-sm pl-5 grid grid-cols-2">
          <p>김제윤 드라이버</p>
          <img src={Vector} />
        </div>
        <div className=" max-w-screen-xl h-[300px] pl-5 pt-3">
          <div>
            <PartyBigBox />
          </div>
          <div className="relative max-w-screen-xl mx-auto pb-4 hidden md:block">
            <IconBox />
          </div>
          <div className="">
            <Period />
            <PartyNumberBox />
            <ToTalCredit />
            <FirstCredit />
            <SecondCredit />
            <TravelerBox />
            <TravelerGreet />
          </div>
          <div>
            <PlaceInfoBox />
          </div>
          <div className="pl-4">
            <Detailed />
            <Comment />
            <CommentCom />
          </div>
          <div>
            <AddComment />
          </div>
          <div>
            <Credit />
          </div>
          <div className="">
            <Agreement />
          </div>
          <div>
            <Refund />
          </div>
          <div>
            <ReservBtn title="제안 보내기" />
          </div>
          <div></div>
        </div>
=======
    <div className="px-2 md:px-5">
      <div className="text-2xl text-black">{place}</div>
      <div className="text-sm text-darkgray cursor-pointer">
        <span>{`김제윤 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
>>>>>>> bc46121a33e94a96d8c32ed3d7979a5fb2c364d2
      </div>

      <PartyBigBox />
      <IconBox />

      <Period />
      <PartyNumberBox />
      <ToTalCredit />
      <FirstCredit />
      <SecondCredit />

      <TravelerBox />
      <TravelerGreet />
      <CourseDnD />
      <PlaceInfoBox />

      <Detailed />
      <CommentList />
      <AddComment />
      <Credit shakeCredit={shakeCredit} />
      <Agreement />
      <SuggestButton suggestHandler={suggestHandler} />
      <BottomRefund />
    </div>
  );
}

export default CourseSuggestPage;
