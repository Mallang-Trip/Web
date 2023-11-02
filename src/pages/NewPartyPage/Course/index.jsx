import { useNavigate } from "react-router-dom";
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
  date,
  driverInfo,
  planData,
  selectedCourseId,
  setSelectedCourseId,
  member,
  region,
}) {
  const navigation = useNavigate();

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
        availableNewCourse={true}
      />
      <TextArea
        title={"날짜 선택"}
        content={`${date.slice(0, 4)}년 ${date.slice(5, 7)}월 ${date.slice(
          8,
          10
        )}일~${date.slice(0, 4)}년 ${date.slice(5, 7)}월 ${date.slice(
          8,
          10
        )}일`}
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
        startDate={`${date.slice(0, 4)}.${date.slice(5, 7)}.${date.slice(
          8,
          10
        )}`}
      />
      <ReservationButton
        clickHander={() =>
          navigation(
            `/party/new/6?region=${region}&member=${member}&date=${date}&driverId=${driverInfo.driverId}`
          )
        }
      />
    </div>
  );
}

export default Course;
