import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDriverInfo } from "../../api/driver";
import basicProfileImage from "../../assets/images/profileImage.png";
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
  }, [driverId]);

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
        profileImg={driverInfo.profileImg}
      />
      <PartyImageBox
        images={[driverInfo.profileImg, ...courseImgs, ...courseImgs]}
        name={driverInfo.name}
      />
      <IconBox
        images={[
          driverInfo.profileImg || basicProfileImage,
          ...courseImgs,
          ...courseImgs,
        ]}
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
        reloadData={settingDriverInfo}
      />
      <AddComment
        id={driverId}
        isDriver={true}
        reloadData={settingDriverInfo}
      />
    </PageContainer>
  );
}

export default DriverProfilePage;
