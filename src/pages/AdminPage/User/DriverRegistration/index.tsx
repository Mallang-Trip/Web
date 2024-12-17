import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDriverApplyAdmin } from "@/api/driver";
import { NewDriverInfo } from "@/types";
import { Title, Loading } from "@/components";
import WaitingCount from "./WaitingCount";
import DriverDetail from "./DriverDetail";
import DriverList from "./DriverList";

function DriverRegistration() {
  const [searchParams] = useSearchParams();
  const driverId = searchParams.get("driverId");
  const [loading, setLoading] = useState(true);
  const [waitingDriverData, setWaitingDriverData] = useState<NewDriverInfo[]>(
    []
  );
  const [driverInfo, setDriverInfo] = useState<NewDriverInfo>({
    accountHolder: "",
    accountNumber: "",
    bank: "",
    driverId: 0,
    driverLicenceImg: "",
    insuranceLicenceImg: "",
    introduction: "",
    phoneNumber: "",
    prices: [],
    profileImg: undefined,
    region: [],
    status: "",
    taxiLicenceImg: "",
    vehicleCapacity: 0,
    vehicleImgs: [],
    vehicleModel: "",
    vehicleNumber: "",
  });

  const getDriverApplyAdminFunc = useCallback(async () => {
    try {
      const result = await getDriverApplyAdmin();
      setWaitingDriverData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDriverApplyAdminFunc();
  }, []);

  if (loading) return <Loading full={true} />;
  return (
    <div>
      <Title title="드라이버 등록 심사 대기건" />
      <WaitingCount count={waitingDriverData.length} />
      {driverId ? (
        <DriverDetail
          driverInfo={driverInfo}
          getDriverApplyAdminFunc={getDriverApplyAdminFunc}
        />
      ) : (
        <DriverList
          waitingDriverData={waitingDriverData}
          setDriverInfo={setDriverInfo}
        />
      )}
    </div>
  );
}

export default memo(DriverRegistration);
