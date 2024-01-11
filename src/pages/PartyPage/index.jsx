import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPartyDetail, postPartyJoin } from "../../api/party";
import PageContainer from "../../components/PageContainer";
import HeadTitle from "../../components/HeadTitle";
import PartyPlan from "../../components/PartyPlan";
import PartyIconBox from "../../components/PartyIconBox";
import PartyImageBox from "../../components/PartyImageBox";
import CourseMap from "../../components/CourseMap";
import Loading from "../../components/Loading";
import Credit from "../../components/Credit";
import BottomRefund from "../../components/BottomRefund";
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
// import ConfirmModal from "../../components/ConfirmModal";
import CheckModal from "../../components/CheckModal";
import QuitButton from "./QuitButton";

function PartyPage() {
  const navigation = useNavigate();
  const user = useSelector((state) => state.user);
  const { type, partyId } = useParams();
  const companionsRef = useRef();
  const creditRef = useRef();
  const agreementRef = useRef();
  const [partyData, setPartyData] = useState({});
  const [memberCount, setMemberCount] = useState(1);
  const [companions, setCompanions] = useState([]);
  const [content, setContent] = useState("");
  const [registerCredit, setRegisterCredit] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState([false, false]);
  const [shakeCompanions, setShakeCompanions] = useState(false);
  const [shakeCredit, setShakeCredit] = useState(false);
  const [shakeAgree, setShakeAgree] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const joinHandler = () => {
    if (!user.auth) return setShowLoginModal(true);

    if (type === "detail") return navigation(`/party/join/${partyId}`);

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

    setShowJoinModal(true);
  };

  const joinPartyHandler = async () => {
    setShowJoinModal(false);

    try {
      const body = {
        changeCourse: false,
        content: content,
        headcount: memberCount,
        companions: companions.slice(0, memberCount - 1),
      };

      await postPartyJoin(partyId, body);
      navigation(-1, { replace: true });
      getPartyData(true);
    } catch (e) {
      console.log(e);
    }
  };

  const getPartyData = async (toScrollTop = false) => {
    try {
      const result = await getPartyDetail(partyId);
      setPartyData(result.payload);

      if (toScrollTop) window.scrollTo({ top: 0 });
      console.log(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (!partyData.partyId) getPartyData();
  }, [type, partyId]);

  if (!partyData.partyId) return <Loading full={true} />;
  return (
    <PageContainer>
      <HeadTitle
        name={partyData.course.name}
        driverName={partyData.driverName}
        driverId={partyData.driverId}
        isDriver={true}
      />
      <PartyImageBox
        images={partyData.course.images}
        name={partyData.course.name}
      />
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
      />
      {partyData.myParty && (
        <MallangReady partyData={partyData} getPartyData={getPartyData} />
      )}
      <ToTalPrice totalPrice={partyData.course?.totalPrice} />
      <CreditInfo
        totalPrice={partyData.course.totalPrice}
        capacity={partyData.capacity}
      />
      {type === "join" && (
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
      <PartyPlan
        edit={true}
        course={partyData.course}
        startDate={partyData.startDate}
      />
      <CourseMap markerData={partyData.course.days[0].destinations} />
      {type === "join" && (
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
      {partyData.myParty ? (
        <QuitButton getPartyData={getPartyData} />
      ) : (
        <JoinButton joinHandler={joinHandler} />
      )}
      {type === "join" && <BottomRefund />}

      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => navigation("/login")}
      />
      <CheckModal
        showModal={showJoinModal}
        setShowModal={setShowJoinModal}
        message={`[${partyData.course.name}]\n\n위 파티에 가입하시겠습니까?`}
        noText="취소"
        yesText="확인"
        yesHandler={() => joinPartyHandler()}
      />
    </PageContainer>
  );
}

export default PartyPage;
