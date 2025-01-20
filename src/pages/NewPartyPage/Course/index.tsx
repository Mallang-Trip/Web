import { Dispatch, memo, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { dateToStringHan, priceToString } from "@/utils";
import {
  DriverInfo as DriverInfoRawType,
  Course as CourseType,
  Review,
} from "@/types";
import {
  ImageBox,
  PartyPlan,
  CourseMap,
  DriverInfo,
  CourseList,
  CommentList,
  AddComment,
} from "@/components";
import CreditInfo from "@/pages/PartyPage/CreditInfo";
import TextArea from "@/pages/NewPartyPage/Atom/TextArea";
import ReservationButton from "@/pages/NewPartyPage/Atom/ReservationButton";

interface DriverInfoType extends DriverInfoRawType {
  driverId: number;
  reservationCount: number;
  avgRate: number | null;
  reviews: Review[];
}

interface Props {
  date: string;
  driverInfo: DriverInfoType;
  planData: CourseType;
  selectedCourseId: number;
  setSelectedCourseId: Dispatch<SetStateAction<number>>;
  member: number;
  region: string;
  settingDriverInfo: () => void;
}

function Course({
  date,
  driverInfo,
  planData,
  selectedCourseId,
  setSelectedCourseId,
  member,
  region,
  settingDriverInfo,
}: Props) {
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  if (!driverInfo.driverId || !planData.courseId || user.role !== "ROLE_USER")
    return null;
  return (
    <div>
      <DriverInfo
        name={driverInfo.name}
        reservationCount={driverInfo.reservationCount}
        avgRate={driverInfo.avgRate}
        introduction={driverInfo.introduction}
        profileImg={driverInfo.profileImg}
      />
      <ImageBox images={planData.images} name={driverInfo.name} />
      <TextArea title="서비스 지역" content={driverInfo.region} />
      <CourseList
        courses={driverInfo.courses}
        selectedCourseId={selectedCourseId}
        setSelectedCourseId={setSelectedCourseId}
      />
      {member > 0 && <TextArea title="날짜" content={dateToStringHan(date)} />}
      <TextArea
        title="전체 일정 여행비"
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
        mapName="TMAP_COURSE"
      />
      <ReservationButton
        joinHandler={() =>
          navigation(
            `/party/new/${member > 0 ? 6 : 2}?region=${region}&member=${member}&date=${date}&driverId=${driverInfo.driverId}`
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

export default memo(Course);
