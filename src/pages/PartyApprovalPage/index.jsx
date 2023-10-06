import React from "react";
import { useParams } from "react-router-dom";
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
  const { type, place } = useParams();
  console.log(place);

  return (
    <div className="px-2 md:px-5 mb-24">
      <HeadTitle />
      <PartyImageBox />
      <PartyIconBox />
      <Period />
      <Members />
      <FirstCredit primary={true} />
      <SecondCredit />
      <SelectButtons />
      <PartyPlan edit={false} />
      {type === "suggest" && <BeforePlan />}
    </div>
  );
}

export default PartyApprovalPage;
