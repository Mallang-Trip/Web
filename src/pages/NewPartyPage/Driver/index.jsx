import { useEffect, useState } from "react";
import { getRegionDriver } from "../../../api/driver";
import DriverProfile from "./DriverProfile";

function Driver({ region }) {
  const [driverData, setDriverData] = useState([]);

  const getDriverData = async () => {
    try {
      const result = await getRegionDriver(region);
      setDriverData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDriverData();
  }, []);

  return (
    <>
      <div className="pb-3 pl-5 mx-auto text-2xl text-black font-bold">
        드라이버를 선택하세요
      </div>
      <div className="grid grid-cols-2 gap-10 px-6 mx-auto py-8 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
        {driverData.map((item) => (
          <DriverProfile {...item} key={item.driverId} />
        ))}
      </div>
    </>
  );
}

export default Driver;
