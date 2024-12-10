import { memo, useCallback, useEffect, useState } from "react";
import { getPartyList } from "../../../../../api/admin";
import { Party } from "../../../../../types";
import Loading from "../../../../../components/Loading";
import Head from "./Head";
import Body from "./Body";

function FinishedParty() {
  const [loading, setLoading] = useState(true);
  const [partyData, setPartyData] = useState<Party[]>([]);

  const getPartyListFunc = useCallback(async () => {
    try {
      const result = await getPartyList("finished");
      setPartyData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPartyListFunc();
  }, []);

  if (loading) return <Loading full={false} />;
  if (partyData.length === 0)
    return <div className="text-center">완료된 파티가 없습니다.</div>;
  return (
    <div className="w-full flex flex-col gap-2 text-sm font-semibold">
      <Head />
      {partyData.map((party) => (
        <Body key={party.partyId} {...party} />
      ))}
    </div>
  );
}

export default memo(FinishedParty);
