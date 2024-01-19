import { useNavigate } from "react-router-dom";
import { dateToStringHan, priceToString } from "../../../utils";
import PartyImageBox from "../../../components/PartyImageBox";
import PartyPlan from "../../../components/PartyPlan";
import CourseMap from "../../../components/CourseMap";
import CreditInfo from "../../PartyPage/CreditInfo";
import DriverInfo from "../../../components/DriverInfo";
import CourseList from "../../../components/CourseList";
import CommentList from "../../../components/Comment/CommentList";
import AddComment from "../../../components/Comment/AddComment";
import TextArea from "../Atom/TextArea";
import ReservationButton from "../Atom/ReservationButton";

function Course({
  date,
  driverInfo,
  planData,
  selectedCourseId,
  setSelectedCourseId,
  member,
  region,
  settingDriverInfo,
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
        profileImg={driverInfo.profileImg}
      />
      <PartyImageBox images={planData.images} name={driverInfo.name} />
      <TextArea title="서비스 지역" content={driverInfo.region} />
      <CourseList
        courses={driverInfo.courses}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
        availableNewCourse={true}
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
      <PartyPlan
        edit={true}
        course={planData}
        startDate={date}
        editHandler={() =>
          navigation(
            `/party/new/5?region=${region}&member=${member}&date=${date}&driverId=${driverInfo.driverId}`
          )
        }
      />
      <CourseMap
        markerData={planData.days[0].destinations}
        reload={true}
        mapName="TMAP_COURSE_BEFORE"
      />
      <ReservationButton
        joinHander={() =>
          navigation(
            `/party/new/6?region=${region}&member=${member}&date=${date}&driverId=${driverInfo.driverId}`
          )
        }
      />
      <CommentList
        reviews={driverInfo.reviews}
        isDriver={true}
        reloadData={settingDriverInfo}
      />
      <AddComment
        id={driverInfo.driverId}
        isDriver={true}
        reloadData={settingDriverInfo}
      />
    </div>
  );
}

export default Course;
