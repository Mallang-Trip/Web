import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPartyDetail } from "../../api/party";
import PageContainer from "../../components/PageContainer";
import HeadTitle from "../../components/HeadTitle";
import PartyPlan from "../../components/PartyPlan";
import PartyIconBox from "../../components/PartyIconBox";
import ImageBox from "../../components/ImageBox";
import CourseMap from "../../components/CourseMap";
import Loading from "../../components/Loading";
import Credit from "../../components/Credit";
import BottomRefundUser from "../../components/BottomRefundUser";
import BottomRefundDriver from "../../components/BottomRefundDriver";
import ConfirmModal from "../../components/ConfirmModal";
import CheckModal from "../../components/CheckModal";
import PartyDate from "./PartyDate";
import PartyMember from "./PartyMember";
import ToTalPrice from "./ToTalPrice";
import JoinButton from "./JoinButton";
import CreditInfo from "./CreditInfo";
import JoinMember from "./JoinMember";
import JoinMemberInfo from "./JoinMemberInfo";
import JoinGreeting from "./JoinGreeting";
import JoinAgreement from "./JoinAgreement";
import MallangReady from "./MallangReady";
import DriverReview from "./DriverReview";
import QuitButton from "./QuitButton";
import JoinModal from "./JoinModal";
import EditModal from "./EditModal";
import CourseDnD from "./CourseDnD";
import EditMap from "./EditMap";
import EditAgreement from "./EditAgreement";
import CancelNewPartyButton from "./CancelNewPartyButton";
import NewPartyAgreement from "./NewPartyAgreement";
import NotFoundParty from "./NotFoundParty";

function PartyPage() {
  const navigation = useNavigate();
  const user = useSelector((state) => state.user);
  const { type, partyId } = useParams();
  const companionsRef = useRef();
  const creditRef = useRef();
  const agreementRef = useRef();
  const [partyData, setPartyData] = useState({});
  const [memberCount, setMemberCount] = useState(1);
  const [content, setContent] = useState("");
  const [registerCredit, setRegisterCredit] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState([false, false]);
  const [shakeCompanions, setShakeCompanions] = useState(false);
  const [shakeCredit, setShakeCredit] = useState(false);
  const [shakeAgree, setShakeAgree] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showJoinErrorModal, setShowJoinErrorModal] = useState(false);
  const [joinErrorMessage, setJoinErrorMessage] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [companions, setCompanions] = useState([
    {
      name: "",
      phoneNumber: "",
    },
    {
      name: "",
      phoneNumber: "",
    },
    {
      name: "",
      phoneNumber: "",
    },
  ]);

  const checkJoinEdit = () => {
    if (
      partyData.partyStatus === "RECRUITING" &&
      partyData.capacity === partyData.headcount
    ) {
      setJoinErrorMessage(
        "이미 인원이 모두 찬 파티이므로\n가입 또는 코스 수정 제안이 불가능합니다."
      );
      setShowJoinErrorModal(true);
      return false;
    }
    if (
      partyData.partyStatus === "CANCELED_BY_EXPIRATION" ||
      partyData.partyStatus === "CANCELED_BY_ALL_QUIT" ||
      partyData.partyStatus === "CANCELED_BY_DRIVER_QUIT"
    ) {
      setJoinErrorMessage("이미 기한이 만료 또는 취소된 파티입니다.");
      setShowJoinErrorModal(true);
      return false;
    }
    if (
      partyData.partyStatus === "WAITING_JOIN_APPROVAL" ||
      partyData.partyStatus === "WAITING_COURSE_CHANGE_APPROVAL"
    ) {
      setJoinErrorMessage(
        "현재 파티원들이 코스를 수정하는 중이므로\n가입 또는 코스 수정 제안이 불가능합니다.\n\n파티원들의 코스 수정이 완료되면\n가입과 코스 수정 제안이 가능합니다."
      );
      setShowJoinErrorModal(true);
      return false;
    }
    return true;
  };

  const editHandler = () => {
    if (!user.auth) return setShowLoginModal(true);

    if (type === "detail") {
      if (!checkJoinEdit()) return;

      return navigation(`/party/edit/${partyId}`);
    }
  };

  const joinHandler = () => {
    if (!user.auth) return setShowLoginModal(true);

    if (partyData.myParty && type === "edit") return setShowEditModal(true);

    if (type === "detail") {
      if (!checkJoinEdit()) return;

      return navigation(`/party/join/${partyId}`);
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

    if (type === "join") return setShowJoinModal(true);
    if (type === "edit") return setShowEditModal(true);
  };

  const getPartyData = async (toScrollTop = false) => {
    try {
      const result = await getPartyDetail(partyId);
      if (result.statusCode === 200) setPartyData(result.payload);
      else setPartyData({ partyId: -1 });

      if (toScrollTop) window.scrollTo({ top: 0 });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (!partyData.partyId) getPartyData();
  }, [type, partyId]);

  if (!partyData.partyId) return <Loading full={true} />;
  if (partyData.partyId === -1) return <NotFoundParty />;
  return (
    <PageContainer>
      <HeadTitle
        name={partyData.course.name}
        driverName={partyData.driverName}
        driverId={partyData.driverId}
        isDriver={true}
        partyStatus={partyData.partyStatus}
        myParty={
          partyData.myParty && partyData.proposal?.proposerId !== user.userId
        }
      />
      <ImageBox images={partyData.course.images} name={partyData.course.name} />
      <PartyIconBox
        images={partyData.course.images}
        name={partyData.course.name}
        dibs={partyData.dibs}
        type={"party"}
        id={partyData.partyId}
      />
      <PartyDate startDate={partyData.startDate} />
      <PartyMember
        headcount={partyData.headcount}
        capacity={partyData.capacity}
        members={partyData.members}
        driverId={partyData.driverId}
        myParty={partyData.myParty}
        driverReady={partyData.driverReady}
        partyStatus={partyData.partyStatus}
        proposal={partyData.proposal}
      />
      {(partyData.partyStatus === "WAITING_JOIN_APPROVAL" ||
        partyData.partyStatus === "WAITING_COURSE_CHANGE_APPROVAL") && (
        <EditAgreement
          myParty={
            partyData.myParty && partyData.proposal?.proposerId !== user.userId
          }
          partyStatus={partyData.partyStatus}
          createdAt={partyData.proposal?.createdAt}
          getPartyData={getPartyData}
          proposalId={partyData.proposal?.proposalId}
          agreement={[
            {
              userId: partyData.driverId,
              status: partyData.proposal.driverAgreement,
            },
            ...partyData.proposal.memberAgreement,
          ]}
        />
      )}
      {partyData.myParty &&
        (partyData.partyStatus === "RECRUITING" ||
          partyData.partyStatus === "SEALED" ||
          partyData.partyStatus === "WAITING_COURSE_CHANGE_APPROVAL") && (
          <MallangReady
            members={partyData.members}
            driverReady={partyData.driverReady}
            getPartyData={getPartyData}
            partyStatus={partyData.partyStatus}
            startDate={partyData.startDate}
          />
        )}
      {partyData.myParty &&
        (partyData.partyStatus === "SEALED" ||
          partyData.partyStatus === "DAY_OF_TRAVEL" ||
          partyData.partyStatus === "FINISHED") && (
          <DriverReview
            driverId={partyData.driverId}
            startDate={partyData.startDate}
          />
        )}
      <ToTalPrice
        totalPrice={
          user.userId === partyData.driverId
            ? partyData.course?.totalPrice
            : partyData.course?.totalPrice - partyData.course?.discountPrice
        }
        isDriver={user.userId === partyData.driverId}
        partyStatus={partyData.partyStatus}
      />
      {partyData.partyStatus === "WAITING_DRIVER_APPROVAL" &&
        user.userId === partyData.driverId && (
          <NewPartyAgreement getPartyData={getPartyData} />
        )}
      {user.userId !== partyData.driverId &&
        partyData.partyStatus !== "CANCELED_BY_DRIVER_REFUSED" &&
        partyData.partyStatus !== "CANCELED_BY_PROPOSER" &&
        partyData.partyStatus !== "CANCELED_BY_ALL_QUIT" &&
        partyData.partyStatus !== "CANCELED_BY_DRIVER_QUIT" && (
          <CreditInfo
            totalPrice={
              partyData.course?.totalPrice - partyData.course?.discountPrice
            }
            capacity={partyData.capacity}
            partyStatus={partyData.partyStatus}
            paymentAmount={partyData.reservation?.paymentAmount}
            createdAt={partyData.reservation?.createdAt}
            receiptUrl={partyData.reservation?.receiptUrl}
            status={partyData.reservation?.status}
          />
        )}
      {!partyData.myParty && (type === "join" || type === "edit") && (
        <>
          <JoinMember
            memberCount={memberCount}
            setMemberCount={setMemberCount}
            capacity={partyData.capacity}
            headcount={partyData.headcount}
          />
          <JoinMemberInfo
            companionsRef={companionsRef}
            memberCount={memberCount}
            companions={companions}
            setCompanions={setCompanions}
            shakeCompanions={shakeCompanions}
          />
          <JoinGreeting content={content} setContent={setContent} />
        </>
      )}
      {(partyData.partyStatus === "WAITING_JOIN_APPROVAL" ||
        partyData.partyStatus === "WAITING_COURSE_CHANGE_APPROVAL") && (
        <>
          <PartyPlan
            edit={false}
            course={partyData.proposal.course}
            startDate={partyData.startDate}
            editHandler={editHandler}
            comment="새로 제안된 파티 코스"
          />
          <CourseMap
            markerData={partyData.proposal.course.days[0].destinations}
            reload={false}
            mapName="TMAP_COURSE_NEW"
          />
          <hr className="w-full max-w-[900px] bg-darkgray/30 my-20 mx-auto h-px border-0" />
        </>
      )}
      {type === "edit" ? (
        <>
          <CourseDnD
            name={partyData.course.name}
            course={partyData.course}
            startDate={partyData.startDate}
            hours={partyData.course.days[0].hours}
            courseData={courseData}
            setCourseData={setCourseData}
          />
          <EditMap courseData={courseData} setCourseData={setCourseData} />
        </>
      ) : (
        <>
          <PartyPlan
            edit={
              type === "detail" &&
              ((partyData.partyStatus === "RECRUITING" && !partyData.myParty) ||
                (partyData.partyStatus === "SEALED" && partyData.myParty))
            }
            course={partyData.course}
            startDate={partyData.startDate}
            editHandler={editHandler}
            comment={
              (partyData.partyStatus === "WAITING_JOIN_APPROVAL" ||
                partyData.partyStatus === "WAITING_COURSE_CHANGE_APPROVAL") &&
              "기존 파티 코스"
            }
          />
          <CourseMap
            markerData={partyData.course.days[0].destinations}
            reload={false}
            mapName="TMAP_COURSE_BEFORE"
          />
        </>
      )}
      {!partyData.myParty && (type === "join" || type === "edit") && (
        <>
          <Credit
            shakeCredit={shakeCredit}
            register={registerCredit}
            setRegister={setRegisterCredit}
            creditRef={creditRef}
          />
          <JoinAgreement
            checked={agreeChecked}
            setChecked={setAgreeChecked}
            shakeAgree={shakeAgree}
            agreementRef={agreementRef}
          />
        </>
      )}
      {partyData.myParty && type !== "edit" ? (
        partyData.partyStatus === "WAITING_DRIVER_APPROVAL" ? (
          <CancelNewPartyButton isDriver={user.userId === partyData.driverId} />
        ) : (
          <QuitButton
            getPartyData={getPartyData}
            partyStatus={partyData.partyStatus}
            startDate={partyData.startDate}
            paymentAmount={partyData.reservation?.paymentAmount}
            isDriver={user.userId === partyData.driverId}
            totalPrice={
              partyData.course?.totalPrice - partyData.course?.discountPrice
            }
          />
        )
      ) : (
        <JoinButton joinHandler={joinHandler} />
      )}
      {user.userId === partyData.driverId ? (
        <BottomRefundDriver />
      ) : (
        <BottomRefundUser />
      )}

      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText="취소"
        yesText="확인"
        yesHandler={() => navigation("/login")}
      />
      <JoinModal
        showModal={showJoinModal}
        setShowModal={setShowJoinModal}
        content={content}
        memberCount={memberCount}
        companions={companions}
        getPartyData={getPartyData}
        capacity={partyData.capacity}
        headcount={partyData.headcount}
        totalPrice={
          partyData.course?.totalPrice - partyData.course?.discountPrice
        }
        partyName={partyData.course.name}
      />
      <EditModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        content={content}
        memberCount={memberCount}
        companions={companions}
        getPartyData={getPartyData}
        capacity={partyData.capacity}
        headcount={partyData.headcount}
        totalPrice={
          partyData.course?.totalPrice - partyData.course?.discountPrice
        }
        partyName={partyData.course.name}
        course={partyData.course}
        myParty={partyData.myParty}
        courseData={courseData}
      />
      <ConfirmModal
        showModal={showJoinErrorModal}
        setShowModal={setShowJoinErrorModal}
        message={joinErrorMessage}
      />
    </PageContainer>
  );
}

export default PartyPage;
