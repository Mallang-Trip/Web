import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPartyRegionDriverList } from "@/api/region";
import { RegionDriverData } from "@/types";
import { Loading } from "@/components";
import DriverList from "./DriverList";

function RegionDriver() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [regionDriverData, setRegionDriverData] = useState<RegionDriverData[]>(
    []
  );
  const regionId = searchParams.get("region_id");
  const regionName = searchParams.get("region_name");

  const getPartyRegionDriverListFunc = useCallback(async () => {
    if (!regionId) return;

    try {
      const result = await getPartyRegionDriverList(regionId);
      setRegionDriverData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [regionId]);

  useEffect(() => {
    if (regionId) getPartyRegionDriverListFunc();
    else setLoading(true);
  }, [regionId]);

  if (loading) return <Loading full={false} />;
  return (
    <div>
      <p className="mt-4 mb-10 text-4xl text-primary font-bold">{regionName}</p>
      <DriverList regionDriverData={regionDriverData} />
    </div>
  );
}

export default memo(RegionDriver);
