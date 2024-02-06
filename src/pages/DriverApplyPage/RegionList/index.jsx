import { useEffect } from "react";
import { regionData } from "../../../utils/data";
import Region from "./Region";

function RegionList({ setActiveNext, region, setRegion }) {
  const regionHandler = (name) => {
    setRegion(name);
    setActiveNext(true);
  };

  useEffect(() => {
    if (region) setActiveNext(true);
  }, [region]);

  return (
    <div className="grid grid-cols-2 gap-10 px-10 py-8 md:grid-cols-3 lg:grid-cols-4 h-full bg-white rounded-xl overflow-auto">
      {regionData.map((item) => (
        <Region
          key={item.name}
          region={region}
          image={item.image}
          name={item.name}
          regionHandler={regionHandler}
        />
      ))}
    </div>
  );
}

export default RegionList;
