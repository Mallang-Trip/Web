import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getPartyList } from "@/api/party";
import { dateToString, shuffleArray } from "@/utils";
import { DriverData, HeartParty } from "@/types";
import PartyBox from "./PartyBox";
import NoParty from "./NoParty";
import { getDriver } from "@/api/driver";
import DriverBox from "./DriverBox";

function PartyList() {
  const { region, nowDate, num, price } = useSelector(
    (state: RootState) => state.partyFilter
  );
  const [partyData, setPartyData] = useState<HeartParty[]>([]);
  const [driverData, setDriverData] = useState<DriverData[]>([]);
  const [loading, setLoading] = useState(true);

  const ramdomSeed = useMemo(() => {
    const today = new Date();
    return (
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate()
    );
  }, []);

  const getData = useCallback(async () => {
    const regionQuery = region === "모든 지역" ? "all" : region;
    const nowDateQuery =
      nowDate.length === 0
        ? ["all", "all"]
        : nowDate.map((item) => dateToString(item));
    const numQuery = num;
    const priceQuery = price;

    try {
      const driverResult = await getDriver();
      const result = await getPartyList(
        regionQuery,
        nowDateQuery,
        numQuery,
        priceQuery
      );

      setDriverData(shuffleArray(driverResult.payload, ramdomSeed));
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
  if (partyData.length === 0 && driverData.length === 0) return <NoParty />;
  return (
    <div className="grid grid-cols-1 gap-10 mt-6 mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {partyData.map((item) => (
        <PartyBox key={item.partyId} {...item} />
      ))}
      {driverData.map((item) => (
        <DriverBox key={item.driverId} {...item} />
      ))}
    </div>
  );
}

export default memo(PartyList);
