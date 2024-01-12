import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDriverMyInfo } from "../../api/driver";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import UserProfile from "./UserProfile";
import DriverProfile from "./DriverProfile";

function MyProfilePage() {
  const user = useSelector((state) => state.user);
  const [category, setCategory] = useState("");
  const [driverInfo, setDriverInfo] = useState({
    accountHolder: "",
    accountNumber: "",
    bank: "",
    holidays: [],
    introduction: "",
    phoneNumber: "",
    prices: [],
    profileImg: "",
    region: "",
    vehicleCapacity: 0,
    vehicleImg: "",
    vehicleModel: "",
    vehicleNumber: "",
    weeklyHoliday: [],
  });

  const getMyDriverInfo = async () => {
    try {
      const result = await getDriverMyInfo();
      setDriverInfo(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user.role === "ROLE_DRIVER") {
      setCategory("드라이버 프로필");
      getMyDriverInfo();
    } else setCategory("여행자 프로필");
  }, [user.role]);

  return (
    <PageContainer>
      <Header category={category} setCategory={setCategory} />
      {category === "여행자 프로필" ? (
        <UserProfile />
      ) : (
        <DriverProfile
          driverInfo={driverInfo}
          setDriverInfo={setDriverInfo}
          getMyDriverInfo={getMyDriverInfo}
        />
      )}
    </PageContainer>
  );
}

export default MyProfilePage;
