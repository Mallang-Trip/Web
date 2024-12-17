import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserListAdmin } from "@/api/admin";
import { UserData } from "@/types";
import { Title, Loading } from "@/components";
import DriverTable from "./DriverTable";
import DriverDetail from "./DriverDetail";
import DriverCourse from "./DriverCourse";

function DriverInfo() {
  const [searchParams] = useSearchParams();
  const [userList, setUserList] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const driverId = searchParams.get("driverId");
  const courseId = searchParams.get("courseId");

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
  if (courseId) return <DriverCourse />;
  if (driverId) return <DriverDetail />;
  return (
    <div>
      <Title title="드라이버 회원 정보" />
      <DriverTable userList={userList} />
    </div>
  );
}

export default memo(DriverInfo);
