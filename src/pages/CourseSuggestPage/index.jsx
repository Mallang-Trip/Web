import React from "react";
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
import Refund from "../../components/BottomRefund";
import Agreement from "./AddAgree";
import SuggestButton from "./SuggestButton";

function CourseSuggestPage() {
  const { place } = useParams();

  return (
    <div className="px-2 md:px-5">
      <div className="text-2xl text-black">{place}</div>
      <div className="text-sm text-darkgray cursor-pointer">
        <span>{`김제윤 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
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
      <PlaceInfoBox />

      <Detailed />
      <CommentList />
      <AddComment />
      <Credit />
      <Agreement />
      <SuggestButton />
      <Refund />
    </div>
  );
}

export default CourseSuggestPage;