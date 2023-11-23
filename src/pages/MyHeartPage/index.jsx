import { useEffect, useState } from "react";
import { getLikeDestination } from "../../api/destination";
import HeartItem from "./HeartItem";
import NoHeartData from "./NoHeartData";

function MyHeartPage() {
  const [myHeartData, setMyHeartData] = useState([]);

  const getMyHeartData = async () => {
    try {
      const result = await getLikeDestination();
      setMyHeartData(result.payload);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMyHeartData();
  }, []);

  return (
    <div className="px-2 md:px-5 mb-24">
      <div className="text-2xl text-black font-bold">나의 찜</div>
      {myHeartData.length === 0 ? (
        <NoHeartData />
      ) : (
        <div className="grid grid-cols-2 gap-10 mt-9 mx-auto md:grid-cols-3 lg:grid-cols-4">
          {myHeartData.map((item, index) => (
            <HeartItem key={index} destination={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyHeartPage;
