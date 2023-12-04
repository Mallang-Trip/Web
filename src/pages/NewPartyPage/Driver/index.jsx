import { useEffect, useState } from "react";
import { getRegionDriver } from "../../../api/driver";
import DriverProfile from "./DriverProfile";

function Driver({ region, driverId, setDriverId, date, member }) {
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

  return (
    <>
      <div className="pb-3 pl-5 mx-auto text-2xl text-black font-bold">
        드라이버를 선택하세요
      </div>
      <div className="grid grid-cols-1 gap-10 px-6 mx-auto py-8 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
        {driverData.map((item) => (
          <DriverProfile
            {...item}
            key={item.driverId}
            selectedDriverId={driverId}
            setDriverId={setDriverId}
            date={date}
            member={member}
            region={region}
          />
        ))}
      </div>
      {driverData.length === 0 && (
        <div className="w-full text-center">
          {"해당 지역에 등록된 드라이버가 없습니다."}
        </div>
      )}
    </>
  );
}

export default Driver;
