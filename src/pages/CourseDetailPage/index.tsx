import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { dateToString, priceToString } from "@/utils";
import { getCourseDetail } from "@/api/course";
import { getDriverInfo } from "@/api/driver";
import { Course as CourseType, Review } from "@/types";
import {
  ImageBox,
  PartyPlan,
  CourseMap,
  DriverInfo,
  CommentList,
  AddComment,
  Loading,
  PageContainer,
} from "@/components";
import CreditInfo from "@/pages/PartyPage/CreditInfo";
import TextArea from "@/pages/NewPartyPage/Atom/TextArea";
import ReservationButton from "@/pages/NewPartyPage/Atom/ReservationButton";

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

function CourseDetailPage() {
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const { courseId, driverId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [partyType, setPartyType] = useState("new");
  const [courseDetail, setCourseDetail] = useState<CourseType>({
    capacity: 0,
    courseId: 0,
    discountPrice: 0,
    images: [],
    name: "",
    region: "",
    totalDays: 0,
    totalPrice: 0,
    days: [],
  });
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

  const getCourseDetailAPI = useCallback(async () => {
    if (!courseId) return;

    try {
      const courseResult = await getCourseDetail(courseId);
      const driverResult = await getDriverInfo(driverId || "");
      setCourseDetail(courseResult.payload);
      setDriverInfo(driverResult.payload);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [courseId]);

  useEffect(() => {
    getCourseDetailAPI();
  }, [courseId, driverId]);

  if (!courseId || !courseDetail.courseId || isLoading)
    return <Loading full={true} />;
  return (
    <PageContainer>
      <DriverInfo
        name={driverInfo.name}
        reservationCount={driverInfo.reservationCount}
        avgRate={driverInfo.avgRate}
        introduction={driverInfo.introduction}
        profileImg={driverInfo.profileImg}
      />
      <ImageBox images={courseDetail.images} name={driverInfo.name} />
      <TextArea title="서비스 지역" content={driverInfo.region} />
      <TextArea title="날짜" content="자유롭게 선택 가능" />
      <TextArea
        title="전체 일정 여행비"
        content={`${priceToString(courseDetail.totalPrice)}원`}
      />
      <CreditInfo
        totalPrice={courseDetail.totalPrice}
        capacity={courseDetail.capacity}
      />
      <PartyPlan
        edit={false}
        course={courseDetail}
        startDate={dateToString(new Date())}
      />
      <CourseMap
        markerData={courseDetail.days[0].destinations}
        reload={true}
        mapName="TMAP_COURSE"
      />
      <ReservationButton
        partyType={partyType}
        setPartyType={setPartyType}
        joinHandler={() =>
          navigation(
            `/party/new/4?region=${driverInfo.region}&member=${1}&date=${null}&driverId=${driverId}&selectedCourseId=${courseId}`
          )
        }
      />
      <CommentList
        reviews={driverInfo.reviews}
        isDriver={true}
        reloadData={getCourseDetailAPI}
      />
      {user.auth && (
        <AddComment
          id={driverInfo.driverId}
          isDriver={true}
          reloadData={getCourseDetailAPI}
        />
      )}
    </PageContainer>
  );
}

export default memo(CourseDetailPage);
