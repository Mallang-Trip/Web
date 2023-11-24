import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import UserProfile from "./UserProfile";
import DriverProfile from "./DriverProfile";

function MyProfilePage() {
  const user = useSelector((state) => state.user);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (user.role === "ROLE_DRIVER") setCategory("드라이버 프로필");
    else setCategory("여행자 프로필");
  }, [user.role]);

  return (
    <PageContainer>
      <Header category={category} setCategory={setCategory} />
      {category === "여행자 프로필" ? <UserProfile /> : <DriverProfile />}
    </PageContainer>
  );
}

export default MyProfilePage;
