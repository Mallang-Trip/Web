import { useEffect, useState } from "react";
import { getUserListAdmin } from "../../../../api/admin";
import Title from "../../../../components/Title";
import Loading from "../../../../components/Loading";
import DriverTable from "./DriverTable";

function DriverInfo() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

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
  return (
    <div>
      <Title title="드라이버 회원 정보" />
      <DriverTable userList={userList} />
    </div>
  );
}

export default DriverInfo;
