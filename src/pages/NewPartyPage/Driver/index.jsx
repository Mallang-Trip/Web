import { useEffect, useState } from "react";
import { getRegionDriver } from "../../../api/driver";
import DriverProfile from "./DriverProfile";

function Driver({ region, setDriverId, date, member }) {
  const [driverData, setDriverData] = useState([]);

  const getDriverData = async () => {
    try {
      const result = await getRegionDriver(region, member, date);
      setDriverData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDriverData();
  }, [region]);

  useEffect(() => setDriverId(0), []);

  return (
    <>
      <div className="pl-6 mx-auto text-2xl text-black font-bold">
        드라이버를 선택하세요
      </div>
      <div className="grid grid-cols-1 gap-10 px-6 mx-auto py-8 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
        {driverData.map((item) => (
          <DriverProfile
            {...item}
            key={item.driverId}
            setDriverId={setDriverId}
            member={member}
            date={date}
          />
        ))}
      </div>
      {driverData.length === 0 && (
        <div className="w-full text-center">
          {"예약 가능한 드라이버가 없습니다."}
        </div>
      )}
    </>
  );
}

export default Driver;
