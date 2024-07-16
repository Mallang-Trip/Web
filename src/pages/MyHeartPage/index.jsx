import { useEffect, useState } from "react";
import { getLikeParty } from "../../api/party";
import { getLikeDestination } from "../../api/destination";
import PageContainer from "../../components/PageContainer";
import HeartItem from "./HeartItem";
import NoHeartData from "./NoHeartData";

function MyHeartPage() {
  const [myHeartData, setMyHeartData] = useState([]);

  const getMyHeartData = async () => {
    try {
      const party = await getLikeParty();
      const destination = await getLikeDestination();
      setMyHeartData([...party.payload, ...destination.payload]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMyHeartData();
  }, []);

  return (
    <PageContainer>
      <div className="text-2xl text-black font-bold">나의 찜</div>
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

export default MyHeartPage;
