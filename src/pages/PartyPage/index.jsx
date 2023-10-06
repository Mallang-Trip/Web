import React from "react";
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

function PartyPage() {
  return (
    <div className="px-2 md:px-5 mb-24">
      <HeadTitle />
      <PartyImageBox />
      <PartyIconBox />
      <Period />
      <PartyNumber />
      <ToTalCredit />
      <FirstCredit />
      <SecondCredit />
      <PartyPlan edit={true} />
      <ReservBtn />
    </div>
  );
}

export default PartyPage;
