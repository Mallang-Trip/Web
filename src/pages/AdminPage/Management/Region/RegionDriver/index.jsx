import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPartyRegionDriverList } from "../../../../../api/region";
import Loading from "../../../../../components/Loading";
import DriverList from "./DriverList";

function RegionDriver() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [regionDriverData, setRegionDriverData] = useState([]);
  const regionId = searchParams.get("region_id");
  const regionName = searchParams.get("region_name");

  const getPartyRegionDriverListFunc = async () => {
    try {
      const result = await getPartyRegionDriverList(regionId);
      setRegionDriverData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (regionId) getPartyRegionDriverListFunc();
    else setLoading(true);
  }, [regionId]);

  if (loading) return <Loading />;
  return (
    <div>
      <p className="mt-4 mb-10 text-4xl text-primary font-bold">{regionName}</p>
      <DriverList regionDriverData={regionDriverData} />
    </div>
  );
}

export default RegionDriver;
