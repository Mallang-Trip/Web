import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getPartyRegionList } from "@/api/region";
import { RegionData } from "@/types";
import Region from "./Region";

interface Props {
  setActiveNext: Dispatch<SetStateAction<boolean>>;
  region: string[];
  setRegion: Dispatch<SetStateAction<string[]>>;
}

function RegionList({ setActiveNext, region, setRegion }: Props) {
  const [regionData, setRegionData] = useState<RegionData[]>([]);

  const getPartyRegionListFunc = useCallback(async () => {
    try {
      const result = await getPartyRegionList();
      setRegionData(result.payload);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const regionHandler = useCallback(
    (name: string) => {
      if (!region.includes(name)) {
        setRegion([...region, name]);
        setActiveNext(true);
      } else {
        setRegion(region.filter((item) => item !== name));
      }
    },
    [region]
  );

  useEffect(() => {
    if (region.length !== 0) setActiveNext(true);
    else setActiveNext(false);
  }, [region]);

  useEffect(() => {
    getPartyRegionListFunc();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-10 px-10 py-8 md:grid-cols-3 lg:grid-cols-4 h-full bg-white rounded-xl overflow-auto">
      {regionData.map((item) => (
        <Region
          key={item.regionId}
          region={region}
          image={item.image}
          name={item.name}
          regionHandler={regionHandler}
        />
      ))}
    </div>
  );
}

export default memo(RegionList);
