import { useEffect, useState } from "react";
import { getRegionDriver } from "../../../api/driver";
import DriverProfile from "./DriverProfile";

function Driver({ region }) {
  const [driverData, setDriverData] = useState([
    {
      driverId: 1,
      name: "드라이버1",
      profileImg:
        "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/619b939d-4f91-456b-89da-3aa764178c4eprofile.jpg",
    },
    {
      driverId: 2,
      name: "드라이버2",
      profileImg:
        "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/619b939d-4f91-456b-89da-3aa764178c4eprofile.jpg",
    },
    {
      driverId: 3,
      name: "드라이버3",
      profileImg:
        "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/619b939d-4f91-456b-89da-3aa764178c4eprofile.jpg",
    },
    {
      driverId: 4,
      name: "드라이버4",
      profileImg:
        "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/619b939d-4f91-456b-89da-3aa764178c4eprofile.jpg",
    },
    {
      driverId: 5,
      name: "드라이버5",
      profileImg:
        "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/619b939d-4f91-456b-89da-3aa764178c4eprofile.jpg",
    },
    {
      driverId: 6,
      name: "드라이버6",
      profileImg:
        "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/619b939d-4f91-456b-89da-3aa764178c4eprofile.jpg",
    },
    {
      driverId: 7,
      name: "드라이버7",
      profileImg:
        "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/619b939d-4f91-456b-89da-3aa764178c4eprofile.jpg",
    },
    {
      driverId: 8,
      name: "드라이버8",
      profileImg:
        "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/619b939d-4f91-456b-89da-3aa764178c4eprofile.jpg",
    },
  ]);

  const getDriverData = async () => {
    try {
      const result = await getRegionDriver(region);
      setDriverData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // getDriverData();
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