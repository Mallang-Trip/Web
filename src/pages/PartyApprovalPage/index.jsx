import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPartyDetail } from "../../api/party";
import HeadTitle from "./HeadTitle";
import Period from "./Period";
import Members from "./Members";
import SelectButtons from "./SelectButtons";
import PartyImageBox from "../../components/PartyImageBox";
import PartyIconBox from "../../components/PartyIconBox";
import FirstCredit from "../../components/FirstCredit";
import SecondCredit from "../../components/SecondCredit";
import PartyPlan from "../../components/PartyPlan";
import BeforePlan from "./BeforePlan";

function PartyApprovalPage() {
  const { partyId, type } = useParams();
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
      <PartyIconBox />
      <Period startDate={partyData.startDate} endDate={partyData.endDate} />
      <Members />
      <FirstCredit
        primary={true}
        totalPrice={partyData.course?.totalPrice}
        capacity={partyData.capacity}
        memberCount={1}
      />
      <SecondCredit totalPrice={partyData.course?.totalPrice} />
      <SelectButtons />
      <PartyPlan
        edit={false}
        course={partyData.course}
        startDate={partyData.startDate}
      />
      {type === "suggest" && (
        <BeforePlan course={partyData.course} startDate={partyData.startDate} />
      )}
    </div>
  );
}

export default PartyApprovalPage;
