import { useEffect, useState } from "react";
import { getPartyHistory } from "../../api/party";
import PageContainer from "../../components/PageContainer";
import PartyItem from "./PartyItem";
import NoHistoryData from "./NoHistoryData";

function PartyHistoryPage() {
  const [myHistoryData, setMyHistoryData] = useState([]);

  const getMyHistory = async () => {
    try {
      const result = await getPartyHistory();
      setMyHistoryData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMyHistory();
  }, []);

  return (
    <PageContainer>
      <div className="text-2xl text-black font-bold">최근 본 파티</div>
      {myHistoryData.length === 0 ? (
        <NoHistoryData />
      ) : (
        <div className="grid grid-cols-1 gap-10 mt-9 mx-auto md:grid-cols-3 lg:grid-cols-4">
          {myHistoryData.map((item) => (
            <PartyItem key={item.partyId} {...item} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default PartyHistoryPage;
