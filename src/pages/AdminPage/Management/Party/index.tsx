import { memo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Title } from "@/components";
import PartyTab from "./PartyTab";
import PartyDetail from "./PartyDetail";
import BeforeReservation from "./BeforeReservation";
import AfterReservation from "./AfterReservation";
import FinishedParty from "./FinishedParty";
import CanceledParty from "./CanceledParty";

function Party() {
  const [searchParams] = useSearchParams();
  const [partyType, setPartyType] = useState("before_reservation");
  const partyId = searchParams.get("party_id");

  if (partyId) return <PartyDetail partyId={partyId} />;
  return (
    <div className="text-base font-medium">
      <Title title="파티 관리" />
      <PartyTab partyType={partyType} setPartyType={setPartyType} />
      {partyType === "before_reservation" && <BeforeReservation />}
      {partyType === "after_reservation" && <AfterReservation />}
      {partyType === "finished" && <FinishedParty />}
      {partyType === "canceled" && <CanceledParty />}
    </div>
  );
}

export default memo(Party);
