import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDriverInfo } from "../../api/driver";
import PageContainer from "../../components/PageContainer";
import PartyImageBox from "../../components/PartyImageBox";
import DriverInfo from "../NewPartyPage/Course/DriverInfo";
import TextArea from "../NewPartyPage/Course/TextArea";
import CourseList from "../NewPartyPage/Course/CourseList";
import CommentList from "../../components/Comment/CommentList";
import AddComment from "../../components/Comment/AddComment";

function DriverProfilePage() {
  const navigation = useNavigate();
  const { driverId } = useParams();
  const [driverInfo, setDriverInfo] = useState({});
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const [reload, setReload] = useState(false);

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
  }, [driverId, reload]);

  useEffect(() => {
    if (selectedCourseId === 0) return;
    navigation(
      `/party/new/2?region=${driverInfo.region}&member=1&date=null&driverId=${driverId}`,
      {
        state: { selectedCourseId: selectedCourseId },
      }
    );
  }, [selectedCourseId]);

  if (!driverInfo.driverId) return null;
  return (
    <PageContainer>
      <DriverInfo
        name={driverInfo.name}
        reservationCount={driverInfo.reservationCount}
        avgRate={driverInfo.avgRate}
        introduction={driverInfo.introduction}
      />
      <PartyImageBox images={[driverInfo.profileImg]} name={driverInfo.name} />
      <TextArea title={"서비스 지역"} content={driverInfo.region} />
      <CourseList
        courses={driverInfo.courses}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
        availableNewCourse={false}
      />
      <CommentList
        reviews={driverInfo.reviews}
        isDriver={true}
        reload={reload}
        setReload={setReload}
      />
      <AddComment
        id={driverId}
        isDriver={true}
        reload={reload}
        setReload={setReload}
      />
    </PageContainer>
  );
}

export default DriverProfilePage;