import { useEffect, useState } from "react";
import { getPartyHistory } from "../../api/party";
import PartyItem from "./PartyItem";
import NoHistoryData from "./NoHistoryData";

function PartyHistoryPage() {
  const [myHistoryData, setMyHistoryData] = useState([]);

  const getMyHistory = async () => {
    try {
      const result = await getPartyHistory();
      setMyHistoryData(result.payload);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMyHistory();
  }, []);

  return (
    <div className="px-2 md:px-5 mb-24">
      <div className="text-2xl text-black font-bold">최근 본 파티</div>
      {myHistoryData.length === 0 ? (
        <NoHistoryData />
      ) : (
        <div className="grid grid-cols-2 gap-10 mt-9 mx-auto md:grid-cols-3 lg:grid-cols-4">
          {myHistoryData.map((item) => (
            <PartyItem key={item.partyId} party={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PartyHistoryPage;
