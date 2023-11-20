import Header from "./Header";
import UserProfile from "./UserProfile";
import DriverProfile from "./DriverProfile";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function MyProfilePage() {
  const user = useSelector((state) => state.user);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (user.role === "ROLE_DRIVER") setCategory("드라이버 프로필");
    else setCategory("여행자 프로필");
  }, [user.role]);

  return (
    <div className="max-w-screen-xl px-5 mb-24">
      <Header category={category} setCategory={setCategory} />
      {category === "여행자 프로필" ? <UserProfile /> : <DriverProfile />}
    </div>
  );
}

export default MyProfilePage;
