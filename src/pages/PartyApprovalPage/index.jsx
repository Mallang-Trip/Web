import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPartyDetail } from "../../api/party";
import PageContainer from "../../components/PageContainer";
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
import Loading from "../../components/Loading";

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

    window.scrollTo({
      top: 0,
    });
  }, [partyId]);

  if (!partyData.partyId) return <Loading full={true} />;
  return (
    <PageContainer>
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
        dibs={false}
        type={"party"}
        id={partyData.partyId}
      />
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
    </PageContainer>
  );
}

export default PartyApprovalPage;
