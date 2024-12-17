import { memo, useCallback, useEffect, useState } from "react";
import { getUserListAdmin } from "@/api/admin";
import { UserData } from "@/types";
import { Title, Loading } from "@/components";
import UserTable from "./UserTable";

function UserInfo() {
  const [userList, setUserList] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserListAdminFunc = useCallback(async () => {
    try {
      const result = await getUserListAdmin();
      setUserList(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

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

export default memo(UserInfo);
