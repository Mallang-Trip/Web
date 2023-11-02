import React, { useEffect, useState } from "react";
import cross from "../../assets/svg/cross.svg";
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
import MapBox from "../../components/PlaceMap/MapBox";
import RoundBtn from "../../components/PlaceMap/Common/RoundBtn";
import SearchBox from "../../components/PlaceMap/SearchBox";
import AddPlanBtn from "./AddPlanBtn";
import { GET } from "../../utils/axios";
import MapDateBtn from "./Atoms/MapDateBtn";
import { getSearchInfo } from "../../api/destination";
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
  const [clicked, setClicked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleInputChange = (e) => setSearchKeyword(e.target.value);

  const onKeyHandler = async (e) => {
    if (e.key === "Enter") {
      setClicked(true);
      const result = await getSearchInfo(searchKeyword);

      console.log(result);
      //  console.log(obj.lot);
      //console.log(result);
      //console.log(result);
    }
  };
  async () => {
    await GET("/api/destination", true);
  };

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
    navigation(`/party/approval/suggest/${partyId}`, {
      replace: true,
    });
    // try {
    //   const body = {
    //     changeCourse: true,
    //     content: content,
    //     headcount: memberCount,
    //     partyId: partyId,
    //     newCourse: {
    //       images: partyData.course?.images,
    //       totalDays: partyData.course?.totalDays,
    //       name: partyData.course?.name,
    //       capacity: partyData.course?.capacity,
    //       totalPrice: partyData.course?.totalPrice,
    //       days: [
    //         {
    //           day: partyData.course?.days[0].day,
    //           startTime: partyData.course?.days[0].startTime,
    //           endTime: partyData.course?.days[0].endTime,
    //           hours: partyData.course?.days[0].hours,
    //           price: partyData.course?.days[0].price,
    //           destinations: courseData.map((item) => item.destinationId),
    //         },
    //       ],
    //     },
    //   };

    //   await postPartyJoin(body);

    //   navigation(`/party/approval/suggest/${partyId}`, {
    //     replace: true,
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const getPartyData = async () => {
    try {
      const result = await getPartyDetail(partyId);

      setPartyData(result.payload);
      console.log(result.payload);
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
      <PartyIconBox
        images={partyData.course?.images}
        name={partyData.course?.name}
      />
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
      <div className="relative">
        <MapBox />
        <div className="absolute top-5 right-1/3">
          <RoundBtn name={"새로운 장소 추가"} />
        </div>

        <div>
          <div
            id="searchbox"
            className="absolute top-0 left-0 w-full flex justify-center"
          >
            <div className="relative flex w-64  mr-9 mt-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-primary"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="block w-full h-12 pl-10 text-sm text-gray-900 border-2 rounded-full border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-30"
                placeholder="여행지를 검색해보세요"
                value={searchKeyword}
                onChange={handleInputChange}
                onKeyDown={onKeyHandler}
              ></input>
              <button className="absolute inset-y-0 right-0 items-center pr-3 hover:cursor-pointer">
                <img src={cross} />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-1/3">
          <AddPlanBtn />
        </div>
      </div>

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
