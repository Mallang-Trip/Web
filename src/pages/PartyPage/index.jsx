import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPartyDetail } from "../../api/party";
import HeadTitle from "./HeadTitle";
import PartyPlan from "../../components/PartyPlan";
import PartyIconBox from "../../components/PartyIconBox";
import PartyImageBox from "../../components/PartyImageBox";
import FirstCredit from "../../components/FirstCredit";
import Period from "./Atoms/Period";
import PartyNumber from "./Atoms/PartyNumber";
import SecondCredit from "../../components/SecondCredit";
import ToTalCredit from "./Atoms/ToTalCredit";
import ReservBtn from "./ReservBtn";
import PlaceMap from "../../components/PlaceMap";

function PartyPage() {
  const { partyId } = useParams();
  const [partyData, setPartyData] = useState({});

  const getPartyData = async () => {
    try {
      const result = await getPartyDetail(partyId);
      setPartyData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPartyData();
  }, [partyId]);

  if (!partyData.partyId) return null;
  return (
    <div className="px-2 md:px-5 mb-24">
      <HeadTitle
        name={partyData.course?.name}
        driverName={partyData.driverName}
        driverId={partyData.driverId}
      />
      <PartyImageBox
        images={partyData.course?.images}
        name={partyData.course?.name}
      />
      <PartyIconBox
        images={partyData.course?.images}
        name={partyData.course?.name}
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
      <PlaceMap search={false} newPlace={false} />
      <ReservBtn partyId={partyData.partyId} />
    </div>
  );
}

export default PartyPage;
