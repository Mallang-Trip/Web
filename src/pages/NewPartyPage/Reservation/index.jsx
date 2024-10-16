import { useRef, useState } from "react";
import { dateToStringHan, priceToString } from "../../../utils";
import ImageBox from "../../../components/ImageBox";
import DriverInfo from "../../../components/DriverInfo";
import CourseList from "../../../components/CourseList";
import Credit from "../../../components/Credit";
import BottomRefundUser from "../../../components/BottomRefundUser";
import CourseMap from "../../../components/CourseMap";
import PartyPlan from "../../../components/PartyPlan";
import TextArea from "../Atom/TextArea";
import ReservationButton from "../Atom/ReservationButton";
import CreateModal from "../Atom/CreateModal";
import CreditInfo from "../../PartyPage/CreditInfo";
import JoinMember from "../../PartyPage/JoinMember";
import JoinMemberInfo from "../../PartyPage/JoinMemberInfo";
import JoinGreeting from "../../PartyPage/JoinGreeting";
import JoinAgreement from "../../PartyPage/JoinAgreement";
import Promotion from "../../../components/Promotion";

function Reservation({
  date,
  driverInfo,
  planData,
  selectedCourseId,
  setSelectedCourseId,
  member,
  region,
  setRegion,
}) {
  const companionsRef = useRef();
  const creditRef = useRef();
  const agreementRef = useRef();
  const [memberCount, setMemberCount] = useState(member);
  const [content, setContent] = useState("");
  const [agreeChecked, setAgreeChecked] = useState([false, false]);
  const [registerCredit, setRegisterCredit] = useState(false);
  const [shakeCompanions, setShakeCompanions] = useState(false);
  const [shakeCredit, setShakeCredit] = useState(false);
  const [shakeAgree, setShakeAgree] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [companions, setCompanions] = useState(
    Array.from({ length: 10 }, () => ({
      name: "",
      phoneNumber: "",
    }))
  );
  const [promotionId, setPromotionId] = useState(0);

  const joinHandler = () => {
    // 동행자 정보 입력 체크
    if (memberCount > 1) {
      let checkValid = true;

      companions.slice(0, memberCount - 1).forEach((item) => {
        if (!item.name || !item.phoneNumber) {
          checkValid = false;
        }
      });

      if (!checkValid) {
        if (companionsRef.current) {
          const containerRect = companionsRef.current.getBoundingClientRect();
          const scrollY =
            containerRect.top +
            window.scrollY -
            window.innerHeight / 2 +
            containerRect.height / 2;

          window.scrollTo({ top: scrollY });
        }

        setShakeCompanions(true);
        setTimeout(() => setShakeCompanions(false), 1000);
        return;
      }
    }
    // 결제 수단 등록 체크
    if (!registerCredit && promotionId === 0) {
      if (creditRef.current) {
        const containerRect = creditRef.current.getBoundingClientRect();
        const scrollY =
          containerRect.top +
          window.scrollY -
          window.innerHeight / 2 +
          containerRect.height / 2;

        window.scrollTo({ top: scrollY });
      }

      setShakeCredit(true);
      setTimeout(() => setShakeCredit(false), 1000);
      return;
    }
    // 약관 동의 체크
    if (agreeChecked.filter((i) => i === false).length > 0) {
      if (agreementRef.current) {
        const containerRect = agreementRef.current.getBoundingClientRect();
        const scrollY =
          containerRect.top +
          window.scrollY -
          window.innerHeight / 2 +
          containerRect.height / 2;

        window.scrollTo({ top: scrollY });
      }

      setShakeAgree(true);
      setTimeout(() => setShakeAgree(false), 1000);
      return;
    }

    setShowJoinModal(true);
  };

  if (!driverInfo.driverId || !planData.courseId) return null;
  return (
    <div>
      <DriverInfo
        name={driverInfo.name}
        reservationCount={driverInfo.reservationCount}
        avgRate={driverInfo.avgRate}
        introduction={driverInfo.introduction}
        profileImg={driverInfo.profileImg}
      />
      <ImageBox images={planData.images} name={driverInfo.name} />
      <TextArea title="서비스 지역" content={driverInfo.region} />
      <CourseList
        courses={driverInfo.courses}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
      />
      <TextArea title="날짜" content={dateToStringHan(date)} />
      <TextArea
        title="전체 파티 여행비"
        content={`${priceToString(planData.totalPrice)}원`}
      />
      <CreditInfo
        totalPrice={planData.totalPrice}
        capacity={planData.capacity}
      />
      <JoinMember
        memberCount={memberCount}
        setMemberCount={setMemberCount}
        capacity={planData.capacity}
        headcount={0}
      />
      <JoinMemberInfo
        companionsRef={companionsRef}
        memberCount={memberCount}
        companions={companions}
        setCompanions={setCompanions}
        shakeCompanions={shakeCompanions}
      />
      <JoinGreeting content={content} setContent={setContent} />
      <PartyPlan edit={false} course={planData} startDate={date} />
      <CourseMap
        markerData={planData.days[0].destinations}
        reload={true}
        mapName="TMAP_COURSE"
        setRegion={setRegion}
      />
      <Promotion
        setPromotionId={setPromotionId}
        price={planData?.days[0]?.price}
      />
      {promotionId === 0 && (
        <Credit
          shakeCredit={shakeCredit}
          register={registerCredit}
          setRegister={setRegisterCredit}
          creditRef={creditRef}
        />
      )}
      <JoinAgreement
        checked={agreeChecked}
        setChecked={setAgreeChecked}
        shakeAgree={shakeAgree}
        agreementRef={agreementRef}
      />
      <ReservationButton joinHandler={joinHandler} />
      <BottomRefundUser />

      <CreateModal
        showModal={showJoinModal}
        setShowModal={setShowJoinModal}
        content={content}
        memberCount={memberCount}
        companions={companions}
        date={date}
        planData={planData}
        destinations={planData.days[0].destinations}
        driverId={driverInfo.driverId}
        region={region}
        promotionId={promotionId}
      />
    </div>
  );
}

export default Reservation;
