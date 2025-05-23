import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getPartyDetail } from "@/api/party";
import { Destination, Party } from "@/types";
import { isGAlive } from "@/utils/ga";
import {
  PageContainer,
  HeadTitle,
  PartyPlan,
  PartyIconBox,
  ImageBox,
  CourseMap,
  Loading,
  Credit,
  BottomRefundUser,
  BottomRefundDriver,
  ConfirmModal,
  CheckModal,
  Promotion,
} from "@/components";
import ReactGA from "react-ga4";
import PartyDate from "./PartyDate";
import PartyMember from "./PartyMember";
import PartyIntro from "./PartyIntro";
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
import { loadNaverScript } from "@/utils/naverTracking";

function PartyPage() {
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const { type, partyId } = useParams();
  const companionsRef = useRef<HTMLDivElement | null>(null);
  const creditRef = useRef<HTMLDivElement | null>(null);
  const agreementRef = useRef<HTMLDivElement | null>(null);
  const [memberCount, setMemberCount] = useState(1);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("");
  const [registerCredit, setRegisterCredit] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState([true, true]);
  const [shakeCompanions, setShakeCompanions] = useState(false);
  const [shakeCredit, setShakeCredit] = useState(false);
  const [shakeAgree, setShakeAgree] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showJoinErrorModal, setShowJoinErrorModal] = useState(false);
  const [joinErrorMessage, setJoinErrorMessage] = useState("");
  const [courseData, setCourseData] = useState<Destination[]>([]);
  const [region, setRegion] = useState("");
  const [promotionId, setPromotionId] = useState(0);
  const [companions, setCompanions] = useState(
    Array.from({ length: 10 }, () => ({
      name: "",
      phoneNumber: "",
    }))
  );
  const [partyData, setPartyData] = useState<Party>({
    partyId: 0,
    name: "",
    startDate: "",
    headcount: 0,
    capacity: 0,
    promotion: false,
    driverName: "",
    image: "",
    price: 0,
    content: "",
    course: {
      capacity: 0,
      courseId: 0,
      discountPrice: 0,
      images: [],
      name: "",
      region: "",
      totalDays: 0,
      totalPrice: 0,
      days: [],
    },
    dibs: false,
    driverId: 0,
    driverReady: false,
    endDate: "",
    members: [],
    monopoly: false,
    myParty: false,
    partyStatus: "",
    proposal: null,
    proposalExists: false,
    region: "",
    reservation: null,
    status: "RECRUITING",
  });

  const checkJoinEdit = useCallback(() => {
    if (
      partyData.partyStatus === "RECRUITING" &&
      partyData.capacity === partyData.headcount
    ) {
      setJoinErrorMessage(
        "이미 인원이 모두 찬 일정이므로\n가입 또는 코스 수정 제안이 불가능합니다."
      );
      setShowJoinErrorModal(true);
      return false;
    }
    if (
      partyData.partyStatus === "CANCELED_BY_EXPIRATION" ||
      partyData.partyStatus === "CANCELED_BY_ALL_QUIT" ||
      partyData.partyStatus === "CANCELED_BY_DRIVER_QUIT"
    ) {
      setJoinErrorMessage("이미 기한이 만료 또는 취소된 일정입니다.");
      setShowJoinErrorModal(true);
      return false;
    }
    if (
      partyData.partyStatus === "WAITING_JOIN_APPROVAL" ||
      partyData.partyStatus === "WAITING_COURSE_CHANGE_APPROVAL"
    ) {
      setJoinErrorMessage(
        "현재 일행들이 코스를 수정하는 중이므로\n가입 또는 코스 수정 제안이 불가능합니다.\n\n일행들의 코스 수정이 완료되면\n가입과 코스 수정 제안이 가능합니다."
      );
      setShowJoinErrorModal(true);
      return false;
    }
    return true;
  }, [partyData]);

  const editHandler = useCallback(() => {
    if (!user.auth) return setShowLoginModal(true);

    if (checkJoinEdit()) navigation(`/party/edit/${partyId}`);
  }, [user, type, partyId]);

  const joinHandler = useCallback(() => {
    if (!user.auth) return setShowLoginModal(true);

    if (partyData.myParty && type === "edit") return setShowEditModal(true);

    if (type === "detail") {
      if (!checkJoinEdit()) return;

      return navigation(`/party/join/${partyId}`);
    }

    // 동행자 정보 입력 체크
    if (!memberCount) {
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

    if (type === "join") {
      setShowJoinModal(true);
    }
    if (type === "edit") return setShowEditModal(true);
  }, [
    user,
    partyData,
    type,
    partyId,
    memberCount,
    companions,
    companionsRef,
    registerCredit,
    promotionId,
    creditRef,
    agreeChecked,
    agreementRef,
  ]);

  useEffect(() => {
    setPromotionId(0);
  }, [type]);

  useEffect(() => {
    if (!partyData.course) return;

    const newEndTime =
      String(
        (Number(startTime.slice(0, 2)) +
          (partyData.course?.days[0]?.hours || 0)) %
          24
      ).padStart(2, "0") + startTime.slice(2);

    setEndTime(newEndTime);
  }, [startTime, partyData]);

  const getPartyData = useCallback(
    async (toScrollTop = false) => {
      if (!partyId) return;

      try {
        const result = await getPartyDetail(partyId);
        if (result.statusCode !== 200)
          return setPartyData({ ...partyData, partyId: -1 });
        setPartyData(result.payload);
        setRegion(result.payload.region);
        setName(result.payload.course.name);
        setStartTime(result.payload.course.days[0].startTime);
        setEndTime(result.payload.course.days[0].endTime);

        if (
          result?.payload?.myParty === true &&
          (type === "join" || type === "edit")
        ) {
          navigation(`/party/detail/${partyId}`, { replace: true });
        }

        if (toScrollTop) window.scrollTo({ top: 0 });
      } catch (e) {
        console.log(e);
      }
    },
    [partyId, partyData, type]
  );

  useEffect(() => {
    if (isGAlive()) {
      let eventName = "";

      if (type === "detail") eventName = "12_existing_party";
      if (type === "edit") eventName = "13_existing_changecorses";
      if (type === "join") eventName = "13_existing_joincouses";

      ReactGA.event({
        category: "기존 파티 참여",
        action: eventName,
      });
    }
  }, [type]);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (!partyData.partyId) getPartyData();
  }, [type, partyId]);

  useEffect(() => {
    if (type === "detail") {
      if (!partyData.myParty)
        navigation(`/party/join/${partyId}`, { replace: true });
      const cleanup = loadNaverScript("view_content");
      return cleanup;
    }
  }, [type]);

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
      <PartyMember {...partyData} />
      {(partyData.partyStatus === "WAITING_JOIN_APPROVAL" ||
        partyData.partyStatus === "WAITING_COURSE_CHANGE_APPROVAL") &&
        partyData?.proposal && (
          <EditAgreement
            myParty={
              partyData.myParty &&
              partyData?.proposal?.proposerId !== user.userId
            }
            partyStatus={partyData.partyStatus}
            createdAt={partyData?.proposal?.createdAt}
            getPartyData={getPartyData}
            proposalId={partyData?.proposal?.proposalId}
            agreement={[
              {
                userId: partyData.driverId,
                status: partyData?.proposal?.driverAgreement,
              },
              ...partyData?.proposal?.memberAgreement,
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
      <PartyIntro content={partyData.content} />
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
        partyData.myParty &&
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
            paymentAmount={partyData?.reservation?.paymentAmount}
            createdAt={partyData?.reservation?.createdAt}
            receiptUrl={partyData?.reservation?.receiptUrl}
            status={partyData?.reservation?.status}
            reservationId={partyData?.reservation?.reservationId}
            getPartyData={getPartyData}
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
        partyData.partyStatus === "WAITING_COURSE_CHANGE_APPROVAL") &&
        partyData.myParty && (
          <>
            <PartyPlan
              edit={false}
              course={partyData.proposal.course}
              startDate={partyData.startDate}
              editHandler={editHandler}
              comment="새로 제안된 일정 코스"
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
            name={name}
            setName={setName}
            course={partyData.course}
            startDate={partyData.startDate}
            hours={partyData.course.days[0].hours}
            courseData={courseData}
            setCourseData={setCourseData}
            startTime={startTime}
            endTime={endTime}
            setEndTime={setEndTime}
            setStartTime={setStartTime}
            baseTime={partyData.course?.days[0]?.hours || 0}
          />
          <EditMap
            courseData={courseData}
            setCourseData={setCourseData}
            setRegion={setRegion}
          />
        </>
      ) : (
        <>
          <PartyPlan
            edit={
              (type === "detail" &&
                user.role !== "ROLE_DRIVER" &&
                ((partyData.partyStatus === "RECRUITING" &&
                  !partyData.myParty) ||
                  (partyData.partyStatus === "SEALED" && partyData.myParty))) ||
              (type === "join" && !partyData.myParty)
            }
            course={partyData.course}
            startDate={partyData.startDate}
            editHandler={editHandler}
            comment={
              (partyData.partyStatus === "WAITING_JOIN_APPROVAL" ||
                partyData.partyStatus === "WAITING_COURSE_CHANGE_APPROVAL") &&
              partyData.myParty
                ? "기존 일정 코스"
                : ""
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
          <Promotion
            price={partyData.course?.totalPrice}
            setPromotionId={setPromotionId}
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
            paymentAmount={partyData?.reservation?.paymentAmount}
            isDriver={user.userId === partyData.driverId}
            totalPrice={
              partyData.course?.totalPrice - partyData.course?.discountPrice
            }
          />
        )
      ) : (
        <JoinButton
          joinHandler={joinHandler}
          partyStatus={partyData.partyStatus}
        />
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
        promotionId={promotionId}
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
        region={region || partyData.region}
        name={name}
        startTime={startTime}
        endTime={endTime}
        promotionId={promotionId}
      />
      <ConfirmModal
        showModal={showJoinErrorModal}
        setShowModal={setShowJoinErrorModal}
        message={joinErrorMessage}
      />
    </PageContainer>
  );
}

export default memo(PartyPage);
