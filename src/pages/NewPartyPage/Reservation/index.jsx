import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postNewParty } from "../../../api/party";
import PartyImageBox from "../../../components/PartyImageBox";
import PartyNumberBox from "../../CourseSuggestPage/PartyNumberBox";
import ToTalPrice from "../../PartyPage/ToTalPrice";
import FirstCredit from "../../../components/FirstCredit";
import SecondCredit from "../../../components/SecondCredit";
import TravelerBox from "../../CourseSuggestPage/TravelerBox";
import TravelerGreet from "../../CourseSuggestPage/Atoms/TravelerGreet";
import PartyPlan from "../../../components/PartyPlan";
import Credit from "../../../components/Credit";
import Agreement from "../../CourseSuggestPage/AddAgree";
import BottomRefund from "../../../components/BottomRefund";
import CheckModal from "../../../components/CheckModal";
import Loading from "../../../components/Loading";
import ReservationButton from "./ReservationButton";
import HeadTitle from "./HeadTitle";

function Reservation({ member, date, driverInfo, planData }) {
  const navigation = useNavigate();
  const [register, setRegister] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState([false, false]);
  const [shakeCredit, setShakeCredit] = useState(false);
  const [shakeAgree, setShakeAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [memberCount, setMemberCount] = useState(member);

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
        courseId: planData.courseId,
        driverId: driverInfo.driverId,
        endDate: date,
        headcount: member,
        startDate: date,
      };

      const result = await postNewParty(body);

      navigation(`/party/approval/reservation/${result.payload.partyId}`);
    } catch (e) {
      console.log(e);
    }
  };

  if (!driverInfo.driverId || !planData.courseId)
    return <Loading full={true} />;
  return (
    <div className="px-2 md:px-5 mb-24">
      <HeadTitle
        name={planData?.name}
        driverName={driverInfo.name}
        driverId={driverInfo.driverId}
        startDate={`${date.slice(0, 4)}.${date.slice(5, 7)}.${date.slice(
          8,
          10
        )}`}
        endDate={`${date.slice(0, 4)}.${date.slice(5, 7)}.${date.slice(8, 10)}`}
      />
      <PartyImageBox images={planData?.images} name={planData?.name} />
      <div className="mt-7">
        <PartyNumberBox
          memberCount={memberCount}
          setMemberCount={setMemberCount}
        />
      </div>
      <ToTalPrice totalPrice={planData?.totalPrice} />
      <FirstCredit
        totalPrice={planData?.totalPrice}
        capacity={planData.capacity}
        memberCount={memberCount}
      />
      <SecondCredit totalPrice={planData?.totalPrice} />
      <TravelerBox memberCount={memberCount} />
      <TravelerGreet content={content} setContent={setContent} />
      <PartyPlan
        edit={false}
        course={planData}
        startDate={`${date.slice(0, 4)}.${date.slice(5, 7)}.${date.slice(
          8,
          10
        )}`}
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

export default Reservation;
