import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeadTitle from "./HeadTitle";
import PartyIconBox from "../../components/PartyIconBox";
import PartyImageBox from "../../components/PartyImageBox";
import FirstCredit from "../../components/FirstCredit";
import Period from "../PartyPage/Atoms/Period";
import SecondCredit from "../../components/SecondCredit";
import ToTalCredit from "../PartyPage/Atoms/ToTalCredit";
import PartyNumberBox from "./PartyNumberBox";
import TravelerBox from "./TravelerBox";
import TravelerGreet from "./Atoms/TravelerGreet";
import PlaceInfoBox from "./PlaceInfoBox";
import Detailed from "./Atoms/Detailed";
import CommentList from "./CommentList";
import AddComment from "./Atoms/AddComment";
import Credit from "../../components/Credit";
import BottomRefund from "../../components/BottomRefund";
import Agreement from "./AddAgree";
import SuggestButton from "./SuggestButton";
import CourseDnD from "./CourseDnD";
import CheckModal from "../../components/CheckModal";
import { getPartyDetail, postPartyJoin } from "../../api/party";

function CourseSuggestPage() {
  const navigation = useNavigate();
  const { partyId } = useParams();
  const [partyData, setPartyData] = useState({});
  const [register, setRegister] = useState(false);
  const [shakeCredit, setShakeCredit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState([false, false]);
  const [shakeAgree, setShakeAgree] = useState(false);
  const [content, setContent] = useState("");
  const [memberCount, setMemberCount] = useState(1);
  const [courseData, setCourseData] = useState([]);

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

  const courseSuggestHandler = async () => {
    try {
      const body = {
        changeCourse: true,
        content: content,
        headcount: memberCount,
        partyId: partyId,
        newCourse: {
          images: partyData.course?.images,
          totalDays: partyData.course?.totalDays,
          name: partyData.course?.name,
          capacity: partyData.course?.capacity,
          totalPrice: partyData.course?.totalPrice,
          days: [
            {
              day: partyData.course?.days[0].day,
              startTime: partyData.course?.days[0].startTime,
              endTime: partyData.course?.days[0].endTime,
              hours: partyData.course?.days[0].hours,
              price: partyData.course?.days[0].price,
              destinations: courseData.map((item) => item.destinationId),
            },
          ],
        },
      };

      await postPartyJoin(body);

      navigation(`/party/approval/suggest/${partyId}`, {
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
      setCourseData(result.payload.course.days[0].destinations);
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
      />
      <PartyImageBox
        images={partyData.course?.images}
        name={partyData.course?.name}
      />
      <PartyIconBox />
      <Period startDate={partyData.startDate} endDate={partyData.endDate} />
      <PartyNumberBox
        memberCount={memberCount}
        setMemberCount={setMemberCount}
      />
      <ToTalCredit totalPrice={partyData.course?.totalPrice} />
      <FirstCredit
        totalPrice={partyData.course?.totalPrice}
        capacity={partyData.capacity}
        memberCount={memberCount}
      />
      <SecondCredit totalPrice={partyData.course?.totalPrice} />
      <TravelerBox memberCount={memberCount} />
      <TravelerGreet content={content} setContent={setContent} />
      <CourseDnD
        course={partyData.course}
        startDate={partyData.startDate}
        courseData={courseData}
        setCourseData={setCourseData}
      />
      <PlaceInfoBox
        images={partyData.course?.images}
        name={partyData.course?.name}
      />
      <Detailed />
      <CommentList />
      <AddComment />
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
      <SuggestButton suggestHandler={suggestHandler} />
      <BottomRefund />

      <CheckModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={
          "제안을 확정하기 위해 24시간 내로\n드라이버와 여행자들의 동의를 구합니다.\n\n전원 동의 즉시 1차 자동결제가 이루어집니다.\n1차 결제금은 [N]원 입니다.\n\n제안을 보내시겠습니까?"
        }
        noText="취소"
        yesText="확인"
        yesHandler={() => courseSuggestHandler()}
      />
    </div>
  );
}

export default CourseSuggestPage;
