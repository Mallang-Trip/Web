import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDriverInfo } from "../../api/driver";
import PartyImageBox from "../../components/PartyImageBox";
import DriverInfo from "../NewPartyPage/Course/DriverInfo";
import HashTagList from "../NewPartyPage/Course/HashTagList";
import TextArea from "../NewPartyPage/Course/TextArea";
import CourseList from "../NewPartyPage/Course/CourseList";
import CommentList from "../../components/Comment/CommentList";
import AddComment from "../../components/Comment/AddComment";

function DriverProfilePage() {
  // const navigation = useNavigate();
  const { driverId } = useParams();
  const [driverInfo, setDriverInfo] = useState({});
  const [selectedCourseId, setSelectedCourseId] = useState(0);

  const settingDriverInfo = async () => {
    try {
      const result = await getDriverInfo(driverId);
      setDriverInfo(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    settingDriverInfo();
  }, [driverId]);

  useEffect(() => {
    if (selectedCourseId === 0) return;
    console.log(selectedCourseId);
    alert("TODO: 예약 페이지로 이동");
  }, [selectedCourseId]);

  if (!driverInfo.driverId) return null;
  return (
    <div className="px-2 md:px-5 mb-24">
      <DriverInfo
        name={driverInfo.name}
        reservationCount={driverInfo.reservationCount}
        avgRate={driverInfo.avgRate.toFixed(1)}
        introduction={driverInfo.introduction}
      />
      <PartyImageBox images={[driverInfo.profileImg]} name={driverInfo.name} />
      <HashTagList itemList={["#친절", `#${driverInfo.region}`, "#가격"]} />
      <TextArea title={"서비스 지역"} content={driverInfo.region} />
      <CourseList
        courses={driverInfo.courses}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
        availableNewCourse={false}
      />
      <CommentList reviews={driverInfo.reviews} isDriver={true} />
      <AddComment id={driverId} isDriver={true} />
    </div>
  );
}

export default DriverProfilePage;
