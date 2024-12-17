import { memo, useCallback, useEffect, useState } from "react";
import { getLikeParty } from "@/api/party";
import { getLikeDestination } from "@/api/destination";
import { PageContainer, Title } from "@/components";
import HeartItem from "./HeartItem";
import NoHeartData from "./NoHeartData";

interface HeartData {
  partyId: number;
  destinationId: number | undefined;
  image: string | null;
  name: string;
  rate: number | undefined;
  views: number | undefined;
}

function MyHeartPage() {
  const [myHeartData, setMyHeartData] = useState<HeartData[]>([]);

  const getMyHeartData = useCallback(async () => {
    try {
      const party = await getLikeParty();
      const destination = await getLikeDestination();
      setMyHeartData([...party.payload, ...destination.payload]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getMyHeartData();
  }, []);

  return (
    <PageContainer>
      <Title title="나의 찜" />
      {myHeartData.length === 0 ? (
        <NoHeartData />
      ) : (
        <div className="grid grid-cols-1 gap-10 mt-9 mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {myHeartData.map((item, index) => (
            <HeartItem key={index} {...item} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default memo(MyHeartPage);
