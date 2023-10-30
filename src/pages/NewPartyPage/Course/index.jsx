import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDriverInfo } from "../../../api/driver";
import { getCourseDetail } from "../../../api/course";
import { priceToString } from "../../../utils";
import PartyImageBox from "../../../components/PartyImageBox";
import SecondCredit from "./SecondCredit";
import DriverInfo from "./DriverInfo";
import HashTagList from "./HashTagList";
import TextArea from "./TextArea";
import CourseList from "./CourseList";
import PartyPlan from "./PartyPlan";
import ReservationButton from "./ReservationButton";

function Course({
  driverId,
  date,
  driverInfo,
  setDriverInfo,
  planData,
  setPlanData,
  selectedCourseId,
  setSelectedCourseId,
}) {
  const navigation = useNavigate();

  const settingDriverInfo = async () => {
    try {
      const result = await getDriverInfo(driverId);
      setDriverInfo(result.payload);
      setSelectedCourseId(result.payload.courses[0].courseId);
    } catch (e) {
      console.log(e);
    }
  };

  const getCourseDetailFunc = async () => {
    try {
      const result = await getCourseDetail(selectedCourseId);
      setPlanData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    settingDriverInfo();
  }, [driverId]);

  useEffect(() => {
    if (selectedCourseId <= 0 || !selectedCourseId) return;
    getCourseDetailFunc();
  }, [selectedCourseId]);

  if (!driverInfo.driverId || !planData.courseId) return null;
  return (
    <div className="px-2 md:px-5 mb-24">
      <DriverInfo
        name={driverInfo.name}
        reservationCount={driverInfo.reservationCount}
        avgRate={driverInfo.avgRate}
        introduction={driverInfo.introduction}
      />
      <PartyImageBox
        images={[
          driverInfo.profileImg,
          planData.images[0],
          planData.images[1] || planData.images[0],
          planData.images[2] || planData.images[0],
          planData.images[3] || planData.images[0],
        ]}
        name={driverInfo.name}
      />
      <HashTagList itemList={["#친절", `#${driverInfo.region}`, "#가격"]} />
      <TextArea title={"서비스 지역"} content={driverInfo.region} />
      <CourseList
        courses={driverInfo.courses}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
      />
      <TextArea
        title={"날짜 선택"}
        content={`${date[0].getFullYear()}년 ${
          date[0].getMonth() + 1
        }월 ${date[0].getDate()}일~${date[1].getFullYear()}년 ${
          date[1].getMonth() + 1
        }월 ${date[1].getDate()}일`}
      />
      <TextArea
        title={"전체 파티 여행비"}
        content={`${priceToString(
          planData.totalPrice
        )}원 (참여 가능한 최대 인원 ${planData.capacity}명)`}
      />
      <TextArea
        title={"나의 1차 결제금"}
        content={`${priceToString(planData.totalPrice / 4)}원`}
      />
      <SecondCredit totalPrice={planData.totalPrice} />
      <PartyPlan
        planData={planData}
        startDate={`${date[0].getFullYear()}.${
          date[0].getMonth() + 1
        }.${date[0].getDate()}`}
      />
      <ReservationButton clickHander={() => navigation("/party/new/6")} />
    </div>
  );
}

export default Course;
