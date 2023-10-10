import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeadTitle from "./HeadTitle";
import PartyIconBox from "../../components/PartyIconBox";
import PartyImageBox from "../../components/PartyImageBox";
import FirstCredit from "../../components/FirstCredit";
import Period from "../PartyPage/Atoms/Period";
import SecondCredit from "../../components/SecondCredit";
import ToTalCredit from "../PartyPage/Atoms/ToTalCredit";
import PartyNumberBox from "./PartyNumberBox";
import TravelerBox from "./TravelerBox";
import TravelerGreet from "./Atoms/TravelerGreet";
import PlaceInfoBox from "./PlaceInfoBox";
import Detailed from "./Atoms/Detailed";
import CommentList from "./CommentList";
import AddComment from "./Atoms/AddComment";
import Credit from "../../components/Credit";
import BottomRefund from "../../components/BottomRefund";
import Agreement from "./AddAgree";
import SuggestButton from "./SuggestButton";
import CourseDnD from "./CourseDnD";
import CheckModal from "../../components/CheckModal";

function CourseSuggestPage() {
  const navigation = useNavigate();
  const { place } = useParams();
  const [register, setRegister] = useState(false);
  const [shakeCredit, setShakeCredit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const suggestHandler = () => {
    if (register) return setShowModal(true);

    setShakeCredit(true);
    setTimeout(() => setShakeCredit(false), 1000);
  };

  return (
    <div className="px-2 md:px-5 mb-24">
      <HeadTitle />
      <PartyImageBox />
      <PartyIconBox />
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
      <Credit
        shakeCredit={shakeCredit}
        register={register}
        setRegister={setRegister}
      />
      <Agreement />
      <SuggestButton suggestHandler={suggestHandler} />
      <BottomRefund />

      <CheckModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={
          "제안을 확정하기 위해 24시간 내로\n드라이버와 여행자들의 동의를 구합니다.\n\n전원 동의 즉시 1차 자동결제가 이루어집니다.\n1차 결제금은 [N]원 입니다.\n\n제안을 보내시겠습니까?"
        }
        noText="취소"
        yesText="확인"
        yesHandler={() =>
          navigation(`/party/approval/suggest/${place}`, { replace: true })
        }
      />
    </div>
  );
}

export default CourseSuggestPage;
