import { useEffect, useState } from "react";
import { getMyDriverParty } from "../../../../api/party";
import PartyBox from "../../PartyList/PartyBox";
import NoParty from "./NoParty";

function PartyList({ tab }) {
  const [partyData, setPartyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterParty = () => {
    if (tab === 0)
      return partyData.filter(
        (party) => party.status === "SEALED" || party.status === "DAY_OF_TRAVEL"
      );
    if (tab === 1)
      return partyData.filter(
        (party) =>
          party.status === "RECRUITING" ||
          party.status === "WAITING_JOIN_APPROVAL" ||
          party.status === "WAITING_COURSE_CHANGE_APPROVAL"
      );
    if (tab === 2)
      return partyData.filter(
        (party) => party.status === "WAITING_DRIVER_APPROVAL"
      );
  };

  const getPartyData = async () => {
    try {
      const result = await getMyDriverParty();
      setPartyData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartyData();
  }, []);

  if (loading) return null;
  if (filterParty().length === 0) return <NoParty />;
  return (
    <div className="grid grid-cols-1 gap-10 mt-10 mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {filterParty().map((item) => (
        <PartyBox key={item.partyId} {...item} />
      ))}
    </div>
  );
}

export default PartyList;
