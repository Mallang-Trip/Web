import { useEffect, useState } from "react";
import { getPartyDetail } from "../../../../api/admin";
import Loading from "../../../../components/Loading";
import HeadTitle from "../../../../components/HeadTitle";
import ImageBox from "../../../../components/ImageBox";
import PartyIconBox from "../../../../components/PartyIconBox";
import PartyDate from "../../../PartyPage/PartyDate";
import PartyMember from "../../../PartyPage/PartyMember";
import ToTalPrice from "../../../PartyPage/ToTalPrice";
import PartyPlan from "../../../../components/PartyPlan";
import CourseMap from "../../../../components/CourseMap";
import BottomRefundUser from "../../../../components/BottomRefundUser";
import BottomRefundDriver from "../../../../components/BottomRefundDriver";
import MallangReady from "./MallangReady";

function PartyDetail({ partyId }) {
  const [loading, setLoading] = useState(true);
  const [partyData, setPartyData] = useState({});

  const getPartyDetailFunc = async () => {
    try {
      const result = await getPartyDetail(partyId);
      setPartyData(result.payload);
      console.log(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartyDetailFunc();
  }, [partyId]);

  if (loading || !partyData.partyId) return <Loading />;
  return (
    <div className="text-base font-medium">
      <HeadTitle
        name={partyData.course.name}
        driverName={partyData.driverName}
        driverId={partyData.driverId}
        isDriver={true}
        partyStatus={partyData.partyStatus}
        myParty={true}
      />
      <ImageBox images={partyData.course.images} name={partyData.course.name} />
      <PartyIconBox
        images={partyData.course.images}
        name={partyData.course.name}
        dibs={partyData.dibs}
        type={"party"}
        id={partyData.partyId}
      />
      <PartyDate startDate={partyData.startDate} />
      <PartyMember
        headcount={partyData.headcount}
        capacity={partyData.capacity}
        members={partyData.members}
        driverId={partyData.driverId}
        myParty={true}
        driverReady={partyData.driverReady}
        partyStatus={partyData.partyStatus}
        proposal={partyData.proposal}
      />
      {(partyData.partyStatus === "RECRUITING" ||
        partyData.partyStatus === "SEALED" ||
        partyData.partyStatus === "WAITING_COURSE_CHANGE_APPROVAL") && (
        <MallangReady
          partyId={partyId}
          driverReady={partyData.driverReady}
          partyStatus={partyData.partyStatus}
          startDate={partyData.startDate}
          getPartyDetailFunc={getPartyDetailFunc}
        />
      )}
      <ToTalPrice
        totalPrice={partyData.course?.totalPrice}
        isDriver={true}
        partyStatus={partyData.partyStatus}
      />
      <PartyPlan
        edit={false}
        course={partyData.course}
        startDate={partyData.startDate}
      />
      <CourseMap
        markerData={partyData.course.days[0].destinations}
        reload={false}
        mapName="TMAP_COURSE_ADMIN"
      />
      <BottomRefundUser />
      <BottomRefundDriver />
    </div>
  );
}

export default PartyDetail;