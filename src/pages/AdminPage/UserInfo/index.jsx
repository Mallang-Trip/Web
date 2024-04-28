import { useEffect, useState } from "react";
import { getUserListAdmin } from "../../../api/admin";
import Title from "../../../components/Title";
import Loading from "../../../components/Loading";
import UserTable from "./UserTable";

function UserInfo() {
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
      <Title title="여행자 회원 정보" />
      <UserTable userList={userList} />
    </div>
  );
}

export default UserInfo;
