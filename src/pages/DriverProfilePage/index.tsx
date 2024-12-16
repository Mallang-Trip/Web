import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getDriverInfo } from "../../api/driver";
import { getCourseDetail } from "../../api/course";
import { Review } from "../../types";
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

interface DriverInfoType {
  avgRate: number | null;
  courses: {
    courseId: number;
    courseImg: string;
    courseName: string;
  }[];
  driverId: number;
  introduction: string;
  name: string;
  prices: { hours: number; price: number }[];
  profileImg: string;
  region: string[];
  reservationCount: number;
  reviews: Review[];
  vehicleCapacity: number;
  vehicleImgs: string[];
  vehicleModel: string;
}

function DriverProfilePage() {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const { driverId } = useParams();
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const [driverInfo, setDriverInfo] = useState<DriverInfoType>({
    avgRate: null,
    courses: [],
    driverId: 0,
    introduction: "",
    name: "",
    prices: [],
    profileImg: "",
    region: [],
    reservationCount: 0,
    reviews: [],
    vehicleCapacity: 0,
    vehicleImgs: [],
    vehicleModel: "",
  });

  const courseImgs = useMemo(
    () => driverInfo.courses?.map((item) => item.courseImg),
    [driverInfo]
  );

  const settingDriverInfo = useCallback(async () => {
    if (!driverId) return;
    try {
      const result = await getDriverInfo(driverId);
      setDriverInfo(result.payload);
    } catch (e) {
      console.log(e);
    }
  }, [driverId]);

  const makeParty = useCallback(async () => {
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
  }, [selectedCourseId, driverId]);

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
        id={parseInt(driverId || "")}
        isDriver={true}
        reloadData={settingDriverInfo}
      />
    </PageContainer>
  );
}

export default memo(DriverProfilePage);
