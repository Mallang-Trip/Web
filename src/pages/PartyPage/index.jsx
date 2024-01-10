import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPartyDetail } from "../../api/party";
import PageContainer from "../../components/PageContainer";
import HeadTitle from "../../components/HeadTitle";
import PartyPlan from "../../components/PartyPlan";
import PartyIconBox from "../../components/PartyIconBox";
import PartyImageBox from "../../components/PartyImageBox";
import Loading from "../../components/Loading";
import PartyDate from "./PartyDate";
import PartyMember from "./PartyMember";
import ToTalPrice from "./ToTalPrice";
import JoinButton from "./JoinButton";
import CourseMap from "../../components/CourseMap";
import CreditInfo from "./CreditInfo";

function PartyPage() {
  const { partyId } = useParams();
  const [partyData, setPartyData] = useState({});

  const getPartyData = async () => {
    try {
      const result = await getPartyDetail(partyId);
      setPartyData(result.payload);
      console.log(result.payload);
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
        name={partyData.course.name}
        driverName={partyData.driverName}
        driverId={partyData.driverId}
        isDriver={true}
      />
      <PartyImageBox
        images={partyData.course.images}
        name={partyData.course.name}
      />
      <PartyIconBox
        images={partyData.course.images}
        name={partyData.course.name}
        dibs={false}
        type={"party"}
        id={partyData.partyId}
      />
      <PartyDate startDate={partyData.startDate} />
      <PartyMember
        headcount={partyData.headcount}
        capacity={partyData.capacity}
        members={partyData.members}
        driverId={partyData.driverId}
        driverName={partyData.driverName}
        myParty={partyData.myParty}
      />
      <ToTalPrice totalPrice={partyData.course?.totalPrice} />
      <CreditInfo
        totalPrice={partyData.course.totalPrice}
        capacity={partyData.capacity}
      />
      <PartyPlan
        edit={true}
        course={partyData.course}
        startDate={partyData.startDate}
      />
      <CourseMap markerData={partyData.course.days[0].destinations} />
      <JoinButton partyId={partyData.partyId} />
    </PageContainer>
  );
}

export default PartyPage;
