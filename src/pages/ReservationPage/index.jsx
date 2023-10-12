import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPartyDetail, postPartyJoin } from "../../api/party";
import PartyImageBox from "../../components/PartyImageBox";
import PartyNumberBox from "../CourseSuggestPage/PartyNumberBox";
import ToTalCredit from "../PartyPage/Atoms/ToTalCredit";
import FirstCredit from "../../components/FirstCredit";
import SecondCredit from "../../components/SecondCredit";
import TravelerBox from "../CourseSuggestPage/TravelerBox";
import TravelerGreet from "../CourseSuggestPage/Atoms/TravelerGreet";
import PartyPlan from "../../components/PartyPlan";
import Credit from "../../components/Credit";
import Agreement from "../CourseSuggestPage/AddAgree";
import ReservationButton from "./ReservationButton";
import BottomRefund from "../../components/BottomRefund";
import CheckModal from "../../components/CheckModal";
import HeadTitle from "./HeadTitle";

function ReservationPage() {
  const navigation = useNavigate();
  const { partyId } = useParams();
  const [partyData, setPartyData] = useState({});
  const [register, setRegister] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState([false, false]);
  const [shakeCredit, setShakeCredit] = useState(false);
  const [shakeAgree, setShakeAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [memberCount, setMemberCount] = useState(1);

  const suggestHandler = () => {
    if (!register) {
      setShakeCredit(true);
      setTimeout(() => setShakeCredit(false), 1000);
      return;
    }
    if (agreeChecked.filter((i) => i === false).length > 0) {
      setShakeAgree(true);
      setTimeout(() => setShakeAgree(false), 1000);
      return;
    }

    setShowModal(true);
  };

  const reservationHandler = async () => {
    try {
      const body = {
        changeCourse: false,
        content: content,
        headcount: memberCount,
        partyId: partyId,
      };

      await postPartyJoin(body);

      navigation(`/party/approval/reservation/${partyId}`, {
        replace: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getPartyData = async () => {
    try {
      const result = await getPartyDetail(partyId);
      setPartyData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPartyData();
  }, [partyId]);

  if (!partyData.partyId) return null;
  return (
    <div className="px-2 md:px-5 mb-24">
      <HeadTitle
        name={partyData.course?.name}
        driverName={partyData.driverName}
        driverId={partyData.driverId}
        startDate={partyData.startDate}
        endDate={partyData.endDate}
      />
      <PartyImageBox
        images={partyData.course?.images}
        name={partyData.course?.name}
      />
      <div className="mt-7">
        <PartyNumberBox
          memberCount={memberCount}
          setMemberCount={setMemberCount}
        />
      </div>
      <ToTalCredit totalPrice={partyData.course?.totalPrice} />
      <FirstCredit
        totalPrice={partyData.course?.totalPrice}
        capacity={partyData.capacity}
        memberCount={memberCount}
      />
      <SecondCredit totalPrice={partyData.course?.totalPrice} />
      <TravelerBox memberCount={memberCount} />
      <TravelerGreet content={content} setContent={setContent} />
      <PartyPlan
        edit={false}
        course={partyData.course}
        startDate={partyData.startDate}
      />
      <Credit
        shakeCredit={shakeCredit}
        register={register}
        setRegister={setRegister}
      />
      <Agreement
        checked={agreeChecked}
        setChecked={setAgreeChecked}
        shakeAgree={shakeAgree}
      />
      <ReservationButton suggestHandler={suggestHandler} />
      <BottomRefund />

      <CheckModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={
          "예약을 확정하기 위해\n24시간 내로 드라이버와 여행자들의 동의를 구합니다.\n\n전원 동의 즉시 1차 자동결제가 이루어집니다.\n1차 결제금은 [N]원 입니다.\n\n예약하시겠습니까?"
        }
        noText="취소"
        yesText="확인"
        yesHandler={() => reservationHandler()}
      />
    </div>
  );
}

export default ReservationPage;
