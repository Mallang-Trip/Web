import { memo, useCallback, useEffect, useState } from "react";
import { getPartyList } from "@/api/admin";
import { Party } from "@/types";
import { Loading } from "@/components";
import PartyItem from "./PartyItem";

function BeforeReservation() {
  const [loading, setLoading] = useState(true);
  const [partyData, setPartyData] = useState<Party[]>([]);

  const getPartyListFunc = useCallback(async () => {
    try {
      const result = await getPartyList("before_reservation");
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
    return <div className="text-center">모집 중인 파티가 없습니다.</div>;
  return (
    <div className="w-full flex flex-col gap-5 mx-auto">
      {partyData.map((party) => (
        <PartyItem key={party.partyId} {...party} />
      ))}
    </div>
  );
}

export default memo(BeforeReservation);
