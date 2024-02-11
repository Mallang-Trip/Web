import { useEffect, useRef, useState } from "react";
import { dateToStringHan, priceToString } from "../../../utils";
import PartyImageBox from "../../../components/PartyImageBox";
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

function Edit({
  date,
  driverInfo,
  planData,
  selectedCourseId,
  setSelectedCourseId,
  member,
}) {
  const companionsRef = useRef();
  const creditRef = useRef();
  const agreementRef = useRef();
  const [content, setContent] = useState("");
  const [memberCount, setMemberCount] = useState(1);
  const [companions, setCompanions] = useState([]);
  const [shakeCompanions, setShakeCompanions] = useState(false);
  const [newName, setNewName] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [shakeCredit, setShakeCredit] = useState(false);
  const [registerCredit, setRegisterCredit] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState([false, false]);
  const [shakeAgree, setShakeAgree] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
    if (!registerCredit) {
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
  };

  useEffect(() => setMemberCount(member), [member]);

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
      <PartyImageBox images={planData.images} name={driverInfo.name} />
      <TextArea title="서비스 지역" content={driverInfo.region} />
      <CourseList
        courses={driverInfo.courses}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
        availableNewCourse={false}
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
      <CourseDnD
        name={planData.name}
        course={planData}
        startDate={date}
        hours={planData.days[0].hours}
        courseData={courseData}
        setCourseData={setCourseData}
        nameChange={true}
        newName={newName}
        setNewName={setNewName}
      />
      <EditMap courseData={courseData} setCourseData={setCourseData} />
      <Credit
        shakeCredit={shakeCredit}
        register={registerCredit}
        setRegister={setRegisterCredit}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        creditRef={creditRef}
      />
      <JoinAgreement
        checked={agreeChecked}
        setChecked={setAgreeChecked}
        shakeAgree={shakeAgree}
        agreementRef={agreementRef}
      />
      <ReservationButton joinHander={joinHandler} />
      <BottomRefundUser />

      <CreateModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        content={content}
        memberCount={memberCount}
        companions={companions}
        date={date}
        name={planData.name}
        newName={newName}
        course={planData}
        courseData={courseData}
        cardId={selectedCard.id}
        driverId={driverInfo.driverId}
      />
    </div>
  );
}

export default Edit;
