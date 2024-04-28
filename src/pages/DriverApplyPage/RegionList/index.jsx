import { useEffect, useState } from "react";
import { getPartyRegionList } from "../../../api/region";
import Region from "./Region";

function RegionList({ setActiveNext, region, setRegion }) {
  const [regionData, setRegionData] = useState([]);

  const getPartyRegionListFunc = async () => {
    try {
      const result = await getPartyRegionList();
      setRegionData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  const regionHandler = (name) => {
    setRegion(name);
    setActiveNext(true);
  };

  useEffect(() => {
    if (region) setActiveNext(true);
  }, [region]);

  useEffect(() => {
    getPartyRegionListFunc();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-10 px-10 py-8 md:grid-cols-3 lg:grid-cols-4 h-full bg-white rounded-xl overflow-auto">
      {regionData.map((item) => (
        <Region
          key={item.partyRegionId}
          region={region}
          image={item.regionImg}
          name={item.region}
          regionHandler={regionHandler}
        />
      ))}
    </div>
  );
}

export default RegionList;
