import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { getMyParty } from "../../../../api/party";
import { HeartParty } from "../../../../types";
import PartyBox from "../../PartyList/PartyBox";
import NoParty from "./NoParty";

interface Props {
  tab: number;
}

function PartyList({ tab }: Props) {
  const [partyData, setPartyData] = useState<HeartParty[]>([]);
  const [loading, setLoading] = useState(true);

  const filterParty: HeartParty[] = useMemo(() => {
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
    return [];
  }, [partyData, tab]);

  const getPartyData = useCallback(async () => {
    try {
      const result = await getMyParty();
      setPartyData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPartyData();
  }, []);

  if (loading) return null;
  if (filterParty.length === 0) return <NoParty />;
  return (
    <div className="grid grid-cols-1 gap-10 mt-10 mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {filterParty.map((item) => (
        <PartyBox key={item.partyId} {...item} />
      ))}
    </div>
  );
}

export default memo(PartyList);
