import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDriverInfo } from "../../api/driver";
import PageContainer from "../../components/PageContainer";
import PartyImageBox from "../../components/PartyImageBox";
import CommentList from "../../components/Comment/CommentList";
import AddComment from "../../components/Comment/AddComment";
import Loading from "../../components/Loading";
import DriverInfo from "../../components/DriverInfo";
import CourseList from "../../components/CourseList";
import ServiceRegion from "./ServiceRegion";
import IconBox from "./IconBox";

function DriverProfilePage() {
  const navigation = useNavigate();
  const { driverId } = useParams();
  const [driverInfo, setDriverInfo] = useState({});
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const [reload, setReload] = useState(false);
  const courseImgs = driverInfo?.courses?.map((item) => item.courseImg);

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

  if (!driverInfo.driverId) return <Loading full={true} />;
  return (
    <PageContainer>
      <DriverInfo
        name={driverInfo.name}
        reservationCount={driverInfo.reservationCount}
        avgRate={driverInfo.avgRate}
        introduction={driverInfo.introduction}
      />
      <PartyImageBox
        images={[driverInfo.profileImg, ...courseImgs, ...courseImgs]}
        name={driverInfo.name}
      />
      <IconBox
        images={[driverInfo.profileImg, ...courseImgs, ...courseImgs]}
        name={driverInfo.name}
        introduction={driverInfo.introduction}
      />
      <ServiceRegion region={driverInfo.region} />
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
