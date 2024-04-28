import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDriverApplyAdmin } from "../../../api/driver";
import Title from "../../../components/Title";
import Loading from "../../../components/Loading";
import WaitingCount from "./WaitingCount";
import DriverDetail from "./DriverDetail";
import DriverList from "./DriverList";

function DriverRegistration() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [waitingDriverData, setWaitingDriverData] = useState([]);
  const [driverInfo, setDriverInfo] = useState({});
  const driverId = searchParams.get("driverId");

  const getDriverApplyAdminFunc = async () => {
    try {
      const result = await getDriverApplyAdmin();
      setWaitingDriverData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

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

export default DriverRegistration;
