import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { dateToStringHan, priceToString } from "@/utils";
import { Course, DriverInfo as DriverInfoRaw, Review } from "@/types";
import {
  ImageBox,
  DriverInfo,
  CourseList,
  Credit,
  BottomRefundUser,
  CourseMap,
  PartyPlan,
  Promotion,
} from "@/components";
import TextArea from "@/pages/NewPartyPage/Atom/TextArea";
import ReservationButton from "@/pages/NewPartyPage/Atom/ReservationButton";
import CreateModal from "@/pages/NewPartyPage/Atom/CreateModal";
import CreditInfo from "@/pages/PartyPage/CreditInfo";
import JoinMember from "@/pages/PartyPage/JoinMember";
import JoinMemberInfo from "@/pages/PartyPage/JoinMemberInfo";
import JoinGreeting from "@/pages/PartyPage/JoinGreeting";
import JoinAgreement from "@/pages/PartyPage/JoinAgreement";

interface DriverInfoType extends DriverInfoRaw {
  driverId: number;
  reservationCount: number;
  avgRate: number | null;
  reviews: Review[];
}

interface Props {
  date: string;
  driverInfo: DriverInfoType;
  planData: Course;
  selectedCourseId: number;
  setSelectedCourseId: Dispatch<SetStateAction<number>>;
  member: number;
  region: string;
  partyType: string;
}

function Reservation({
  date,
  driverInfo,
  planData,
  selectedCourseId,
  setSelectedCourseId,
  member,
  region,
  partyType,
}: Props) {
  const navigation = useNavigate();
  const companionsRef = useRef<HTMLDivElement | null>(null);
  const creditRef = useRef<HTMLDivElement | null>(null);
  const agreementRef = useRef<HTMLDivElement | null>(null);
  const [memberCount, setMemberCount] = useState(member);
  const [content, setContent] = useState("");
  const [agreeChecked, setAgreeChecked] = useState([true, true]);
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

  const joinHandler = useCallback(() => {
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
  }, [
    companionsRef,
    creditRef,
    agreementRef,
    memberCount,
    companions,
    registerCredit,
    promotionId,
    agreeChecked,
  ]);

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
      {promotionId === 0 && (
        <CourseList
          courses={driverInfo.courses}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
        />
      )}
      <TextArea title="날짜" content={dateToStringHan(date)} />
      <TextArea
        title="전체 일정 여행비"
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
      <PartyPlan
        edit={true}
        course={planData}
        startDate={date}
        editHandler={() =>
          navigation(
            `/party/new/5?region=${region}&member=${member}&date=${date}&driverId=${driverInfo.driverId}`
          )
        }
      />
      <CourseMap
        markerData={planData.days[0].destinations}
        reload={true}
        mapName="TMAP_COURSE"
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
      {false && (
        <JoinAgreement
          checked={agreeChecked}
          setChecked={setAgreeChecked}
          shakeAgree={shakeAgree}
          agreementRef={agreementRef}
        />
      )}
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
        partyType={partyType}
      />
    </div>
  );
}

export default memo(Reservation);
