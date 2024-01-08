import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPartyDetail } from "../../api/party";
import PageContainer from "../../components/PageContainer";
import HeadTitle from "../../components/HeadTitle";
import PartyPlan from "../../components/PartyPlan";
import PartyIconBox from "../../components/PartyIconBox";
import PartyImageBox from "../../components/PartyImageBox";
import FirstCredit from "../../components/FirstCredit";
import Period from "./Atoms/Period";
import PartyNumber from "./Atoms/PartyNumber";
import SecondCredit from "../../components/SecondCredit";
import ToTalCredit from "./Atoms/ToTalCredit";
import ReservBtn from "./ReservBtn";
import CourseMap from "../../components/CourseMap";
import Loading from "../../components/Loading";

function PartyPage() {
  const { partyId } = useParams();
  const [partyData, setPartyData] = useState({});
  const [markerData, setMarkerData] = useState({});

  const getPartyData = async () => {
    try {
      const result = await getPartyDetail(partyId);
      setPartyData(result.payload);
      setMarkerData(result.payload.course.days[0].destinations);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0 });

    getPartyData();
  }, [partyId]);

  if (!partyData.partyId) return <Loading full={true} />;
  return (
    <PageContainer>
      <HeadTitle
        name={partyData.course?.name}
        driverName={partyData.driverName}
        driverId={partyData.driverId}
        isDriver={true}
      />
      <PartyImageBox
        images={partyData.course?.images}
        name={partyData.course?.name}
      />
      <PartyIconBox
        images={partyData.course?.images}
        name={partyData.course?.name}
        dibs={false}
        type={"party"}
        id={partyData.partyId}
      />
      <Period startDate={partyData.startDate} endDate={partyData.endDate} />
      <PartyNumber
        headcount={partyData.headcount}
        capacity={partyData.capacity}
      />
      <ToTalCredit totalPrice={partyData.course?.totalPrice} />
      <FirstCredit
        totalPrice={partyData.course?.totalPrice}
        capacity={partyData.capacity}
        memberCount={1}
      />
      <SecondCredit totalPrice={partyData.course?.totalPrice} />
      <PartyPlan
        edit={true}
        course={partyData.course}
        startDate={partyData.startDate}
      />
      <CourseMap markerData={markerData} />
      <ReservBtn partyId={partyData.partyId} />
    </PageContainer>
  );
}

export default PartyPage;
