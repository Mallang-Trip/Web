import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getPartyList } from "@/api/party";
import { dateToString } from "@/utils";
import { HeartParty } from "@/types";
import PartyBox from "./PartyBox";
import NoParty from "./NoParty";

function PartyList() {
  const { region, nowDate, num, price } = useSelector(
    (state: RootState) => state.partyFilter
  );
  const [partyData, setPartyData] = useState<HeartParty[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    const regionQuery = region === "모든 지역" ? "all" : region;
    const nowDateQuery =
      nowDate.length === 0
        ? ["all", "all"]
        : nowDate.map((item) => dateToString(item));
    const numQuery = num;
    const priceQuery = price;

    try {
      const result = await getPartyList(
        regionQuery,
        nowDateQuery,
        numQuery,
        priceQuery
      );
      setPartyData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [region, nowDate, num, price]);

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0 });
  }, [region, nowDate, num, price]);

  if (loading) return null;
  if (partyData.length === 0) return <NoParty />;
  return (
    <div className="grid grid-cols-1 gap-10 mt-6 mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {partyData.map((item) => (
        <PartyBox key={item.partyId} {...item} />
      ))}
    </div>
  );
}

export default memo(PartyList);
