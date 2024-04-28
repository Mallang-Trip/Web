import { useEffect, useState } from "react";
import { getDriverApplyAdmin } from "../../../api/driver";
import Title from "../../../components/Title";
import Loading from "../../../components/Loading";
import DriverList from "./DriverList";
import WaitingCount from "./WaitingCount";

function DriverRegistration() {
  const [loading, setLoading] = useState(true);
  const [waitingDriverData, setWaitingDriverData] = useState([]);
  const [driverInfo, setDriverInfo] = useState({});

  const getDriverApplyAdminFunc = async () => {
    try {
      const result = await getDriverApplyAdmin();
      setWaitingDriverData(result.payload);
      console.log(result.payload);
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
      <DriverList
        waitingDriverData={waitingDriverData}
        setDriverInfo={setDriverInfo}
      />
    </div>
  );
}

export default DriverRegistration;
