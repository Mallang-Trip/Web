import { useEffect, useState } from "react";
import { getPartyRegionList } from "../../../api/region";
import RegionButton from "./RegionButton";

function Region({ setRegion, member, driverId, date }) {
  const [regionData, setRegionData] = useState([]);

  const getPartyRegionListFunc = async () => {
    try {
      const result = await getPartyRegionList();
      setRegionData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPartyRegionListFunc();
  }, []);

  return (
    <>
      <div className="pl-6 mx-auto text-2xl text-black font-bold">
        가고 싶은 여행지를 찾아요
      </div>
      <div className="grid grid-cols-1 gap-10 px-6 mx-auto py-8 lg:grid-cols-3 xl:grid-cols-4 overflow-auto">
        {regionData.map((item) => (
          <RegionButton
            {...item}
            key={item.partyRegionId}
            setRegion={setRegion}
            member={member}
            driverId={driverId}
            date={date}
          />
        ))}
      </div>
    </>
  );
}

export default Region;
