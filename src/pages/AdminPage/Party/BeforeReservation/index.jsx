import { useEffect, useState } from "react";
import { getPartyList } from "../../../../api/admin";
import PartyItem from "./PartyItem";
import Loading from "../../../../components/Loading";

function BeforeReservation() {
  const [loading, setLoading] = useState(true);
  const [partyData, setPartyData] = useState([]);

  const getPartyListFunc = async () => {
    try {
      const result = await getPartyList("before_reservation");
      setPartyData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartyListFunc();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="w-full flex flex-col gap-5 mx-auto">
      {partyData.map((party) => (
        <PartyItem key={party.partyId} {...party} />
      ))}
    </div>
  );
}

export default BeforeReservation;
