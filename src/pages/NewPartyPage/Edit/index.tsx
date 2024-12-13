import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { dateToStringHan, priceToString } from "../../../utils";
import ImageBox from "../../../components/ImageBox";
import {
  Course,
  Destination,
  DriverInfo as DriverInfoRawType,
  Review,
} from "../../../types";
import DriverInfo from "../../../components/DriverInfo";
import CourseList from "../../../components/CourseList";
import Credit from "../../../components/Credit";
import BottomRefundUser from "../../../components/BottomRefundUser";
import TextArea from "../Atom/TextArea";
import ReservationButton from "../Atom/ReservationButton";
import CreateModal from "../Atom/CreateModal";
import CreditInfo from "../../PartyPage/CreditInfo";
import JoinMember from "../../PartyPage/JoinMember";
import JoinMemberInfo from "../../PartyPage/JoinMemberInfo";
import JoinGreeting from "../../PartyPage/JoinGreeting";
import CourseDnD from "../../PartyPage/CourseDnD";
import EditMap from "../../PartyPage/EditMap";
import JoinAgreement from "../../PartyPage/JoinAgreement";
import PriceList from "./PriceList";
import Promotion from "../../../components/Promotion";

interface DriverInfoType extends DriverInfoRawType {
  driverId: number;
  reservationCount: number;
  avgRate: number | null;
  reviews: Review[];
}

interface Props {
  date: string;
  driverInfo: DriverInfoType;
  planData: Course;
  setPlanData: Dispatch<SetStateAction<Course>>;
  selectedCourseId: number;
  setSelectedCourseId: Dispatch<SetStateAction<number>>;
  member: number;
  region: string;
}

function Edit({
  date,
  driverInfo,
  planData,
  setPlanData,
  selectedCourseId,
  setSelectedCourseId,
  member,
  region,
}: Props) {
  const coursePriceRef = useRef<HTMLDivElement | null>(null);
  const companionsRef = useRef<HTMLDivElement | null>(null);
  const courseRef = useRef<HTMLDivElement | null>(null);
  const creditRef = useRef<HTMLDivElement | null>(null);
  const agreementRef = useRef<HTMLDivElement | null>(null);
  const [courseRegion, setCourseRegion] = useState("");
  const [memberCount, setMemberCount] = useState(member);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [agreeChecked, setAgreeChecked] = useState([false, false]);
  const [courseData, setCourseData] = useState<Destination[]>([]);
  const [registerCredit, setRegisterCredit] = useState(false);
  const [shakeCoursePrice, setShakeCoursePrice] = useState(false);
  const [shakeCompanions, setShakeCompanions] = useState(false);
  const [shakeCourse, setShakeCourse] = useState(false);
  const [shakeCredit, setShakeCredit] = useState(false);
  const [shakeAgree, setShakeAgree] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [companions, setCompanions] = useState(
    Array.from({ length: 10 }, () => ({
      name: "",
      phoneNumber: "",
    }))
  );
  const [promotionId, setPromotionId] = useState(0);

  const joinHandler = useCallback(() => {
    // 시간 및 비용 체크
    if (planData.totalPrice === 0) {
      if (coursePriceRef.current) {
        const containerRect = coursePriceRef.current.getBoundingClientRect();
        const scrollY =
          containerRect.top +
          window.scrollY -
          window.innerHeight / 2 +
          containerRect.height / 2;

        window.scrollTo({ top: scrollY });
      }

      setShakeCoursePrice(true);
      setTimeout(() => setShakeCoursePrice(false), 1000);
      return;
    }
    // 파티명 및 여행지 체크
    if (courseData.length === 0 || !name) {
      if (courseRef.current) {
        const containerRect = courseRef.current.getBoundingClientRect();
        const scrollY =
          containerRect.top +
          window.scrollY -
          window.innerHeight / 2 +
          containerRect.height / 2;

        window.scrollTo({ top: scrollY });
      }

      setShakeCourse(true);
      setTimeout(() => setShakeCourse(false), 1000);
      return;
    }
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

    setShowEditModal(true);
  }, [
    coursePriceRef,
    courseRef,
    companionsRef,
    creditRef,
    agreementRef,
    courseData,
    name,
    memberCount,
    companions,
    registerCredit,
    promotionId,
    agreeChecked,
    planData,
  ]);

  useEffect(() => {
    if (!planData.courseId) return;

    const newEndTime =
      String(
        (Number(startTime.slice(0, 2)) + planData.days[0].hours) % 24
      ).padStart(2, "0") + startTime.slice(2);

    setEndTime(newEndTime);
  }, [startTime, planData]);

  useEffect(() => {
    if (!startTime) setStartTime(planData.days[0].startTime);
    if (selectedCourseId > 0) setCourseData(planData.days[0].destinations);
  }, [planData, selectedCourseId]);

  useEffect(() => {
    if (selectedCourseId <= 0) setCourseData([]);
  }, [selectedCourseId]);

  if (!driverInfo.driverId) return null;
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
      {driverInfo.courses.length > 0 && promotionId === 0 && (
        <CourseList
          courses={driverInfo.courses}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
        />
      )}
      <TextArea title="날짜" content={dateToStringHan(date)} />
      <>
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
      </>
      <JoinMemberInfo
        companionsRef={companionsRef}
        memberCount={memberCount}
        companions={companions}
        setCompanions={setCompanions}
        shakeCompanions={shakeCompanions}
      />
      <JoinGreeting content={content} setContent={setContent} />
      {promotionId === 0 && (
        <PriceList
          prices={driverInfo.prices}
          planData={planData}
          setPlanData={setPlanData}
          shakeCoursePrice={shakeCoursePrice}
          coursePriceRef={coursePriceRef}
        />
      )}
      <CourseDnD
        name={name}
        setName={setName}
        course={planData}
        startDate={date}
        hours={planData.days[0].hours}
        courseData={courseData}
        setCourseData={setCourseData}
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        shakeCourse={shakeCourse}
        courseRef={courseRef}
      />
      <EditMap
        courseData={courseData}
        setCourseData={setCourseData}
        setRegion={setCourseRegion}
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
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        content={content}
        memberCount={memberCount}
        companions={companions}
        date={date}
        newName={name}
        planData={planData}
        destinations={courseData}
        driverId={driverInfo.driverId}
        region={region}
        startTime={startTime}
        endTime={endTime}
        promotionId={promotionId}
      />
    </div>
  );
}

export default memo(Edit);
