import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getDriverInfo } from "../../api/driver";
import { getCourseDetail } from "../../api/course";
import PageContainer from "../../components/PageContainer";
import ImageBox from "../../components/ImageBox";
import CommentList from "../../components/Comment/CommentList";
import AddComment from "../../components/Comment/AddComment";
import Loading from "../../components/Loading";
import DriverInfo from "../../components/DriverInfo";
import CourseList from "../../components/CourseList";
import ServiceRegion from "./ServiceRegion";
import IconBox from "./IconBox";
import CarInfo from "./CarInfo";

function DriverProfilePage() {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const { driverId } = useParams();
  const [driverInfo, setDriverInfo] = useState({});
  const [courseRegion, setCourseRegion] = useState("");
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

  const makeParty = async () => {
    try {
      const result =
        selectedCourseId === -1
          ? null
          : await getCourseDetail(selectedCourseId);

      const regionParam = result?.payload?.region || searchParams.get("region");
      const memberParam = searchParams.get("member");
      const dateParam = searchParams.get("date");

      navigation(
        `/party/new/4?region=${regionParam}&member=${memberParam || 1}&date=${dateParam || null}&driverId=${driverId}&selectedCourseId=${selectedCourseId}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    settingDriverInfo();
  }, [driverId]);

  useEffect(() => {
    if (selectedCourseId === 0) return;
    makeParty();
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
      <ImageBox images={courseImgs} name={driverInfo.name} />
      <IconBox
        images={[driverInfo.profileImg, ...courseImgs, ...courseImgs]}
        name={driverInfo.name}
        introduction={driverInfo.introduction}
      />
      <ServiceRegion region={driverInfo.region} />
      <CarInfo
        vehicleImgs={driverInfo.vehicleImgs}
        vehicleModel={driverInfo.vehicleModel}
        vehicleCapacity={driverInfo.vehicleCapacity}
      />
      <CourseList
        courses={driverInfo.courses}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
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
