import { memo, useCallback, useEffect, useState } from "react";
import { getPartyHistory } from "@/api/party";
import { HeartParty } from "@/types";
import { PageContainer, Title } from "@/components";
import PartyItem from "./PartyItem";
import NoHistoryData from "./NoHistoryData";

function PartyHistoryPage() {
  const [myHistoryData, setMyHistoryData] = useState<HeartParty[]>([]);

  const getMyHistory = useCallback(async () => {
    try {
      const result = await getPartyHistory();
      setMyHistoryData(result.payload);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getMyHistory();
  }, []);

  return (
    <PageContainer>
      <Title title="최근 본 일정" />
      {myHistoryData.length === 0 ? (
        <NoHistoryData />
      ) : (
        <div className="grid grid-cols-1 gap-10 mt-9 mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {myHistoryData.map((item) => (
            <PartyItem key={item.partyId} {...item} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default memo(PartyHistoryPage);
