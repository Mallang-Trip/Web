import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPartyDetail } from "../../api/party";
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
import ConfirmModal from "../../components/ConfirmModal";

function PartyPage() {
  const navigation = useNavigate();
  const { type, partyId } = useParams();
  const creditRef = useRef();
  const agreementRef = useRef();
  const [partyData, setPartyData] = useState({});
  const [memberCount, setMemberCount] = useState(1);
  const [content, setContent] = useState("");
  const [registerCredit, setRegisterCredit] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState([false, false]);
  const [shakeCredit, setShakeCredit] = useState(false);
  const [shakeAgree, setShakeAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const joinHandler = () => {
    if (type === "detail") return navigation(`/party/join/${partyId}`);

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

    setShowModal(true);
  };

  const getPartyData = async () => {
    try {
      const result = await getPartyDetail(partyId);
      setPartyData(result.payload);
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
        dibs={false}
        type={"party"}
        id={partyData.partyId}
      />
      <PartyDate startDate={partyData.startDate} />
      <PartyMember
        headcount={partyData.headcount}
        capacity={partyData.capacity}
        members={partyData.members}
        driverId={partyData.driverId}
        driverName={partyData.driverName}
        myParty={partyData.myParty}
      />
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
          <JoinMemberInfo memberCount={memberCount} />
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
      <JoinButton joinHandler={joinHandler} />
      <BottomRefund />
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"현재는 이용이 불가능합니다.\n베타 테스트를 기다려주세요 :)"}
      />
    </PageContainer>
  );
}

export default PartyPage;
