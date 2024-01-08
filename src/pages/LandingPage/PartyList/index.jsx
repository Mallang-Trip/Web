import { useEffect, useState } from "react";
import { getPartyList } from "../../../api/party";
import { dateToString } from "../../../utils";
import PartyBox from "../Atoms/PartyBox";
import NoParty from "./NoParty";

function PartyList({ region, nowDate, num, price }) {
  const [partyData, setPartyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
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
  };

  useEffect(() => {
    getData();
  }, [region, nowDate, num, price]);

  if (loading) return null;
  if (partyData.length === 0) return <NoParty />;
  return (
    <div className="grid grid-cols-1 gap-10 px-6 mx-auto md:grid-cols-3 lg:grid-cols-4">
      {partyData.map((item) => (
        <PartyBox key={item.partyId} party={item} />
      ))}
    </div>
  );
}

export default PartyList;
