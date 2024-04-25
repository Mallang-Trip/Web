import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Title from "../../../components/Title";
import PartyTab from "./PartyTab";
import PartyDetail from "./PartyDetail";
import BeforeReservation from "./BeforeReservation";

function Party() {
  const [searchParams] = useSearchParams();
  const [partyType, setPartyType] = useState("before_reservation");
  const partyId = searchParams.get("party_id");

  if (partyId) return <PartyDetail partyId={partyId} />;
  return (
    <div>
      <Title title="파티 관리" />
      <PartyTab partyType={partyType} setPartyType={setPartyType} />
      {partyType === "before_reservation" && <BeforeReservation />}
    </div>
  );
}

export default Party;
