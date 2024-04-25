import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Title from "../../../components/Title";
import PartyTab from "./PartyTab";
import BeforeReservation from "./BeforeReservation";

function Party() {
  const [searchParams] = useSearchParams();
  const [partyType, setPartyType] = useState("before_reservation");
  const partyId = searchParams.get("party_id");

  return (
    <div>
      <Title title="파티 관리" />
      <PartyTab partyType={partyType} setPartyType={setPartyType} />
      {/* {partyId && <div>partyId</div>} */}
      {!partyId && partyType === "before_reservation" && <BeforeReservation />}
    </div>
  );
}

export default Party;
