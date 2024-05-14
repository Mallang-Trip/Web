import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserListAdmin } from "../../../../api/admin";
import Title from "../../../../components/Title";
import Loading from "../../../../components/Loading";
import DriverTable from "./DriverTable";
import DriverDetail from "./DriverDetail";
import DriverCourse from "./DriverCourse";

function DriverInfo() {
  const [searchParams] = useSearchParams();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const driverId = searchParams.get("driverId");
  const courseId = searchParams.get("courseId");

  const getUserListAdminFunc = async () => {
    try {
      const result = await getUserListAdmin();
      setUserList(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserListAdminFunc();
  }, []);

  if (loading) return <Loading full={true} />;
  if (courseId) return <DriverCourse />;
  if (driverId) return <DriverDetail />;
  return (
    <div>
      <Title title="드라이버 회원 정보" />
      <DriverTable userList={userList} />
    </div>
  );
}

export default DriverInfo;
