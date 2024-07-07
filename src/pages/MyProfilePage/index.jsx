import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __asyncAuth, logout } from "../../redux/modules/userSlice";
import { getDriverMyInfo } from "../../api/driver";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import UserProfile from "./UserProfile";
import DriverProfile from "./DriverProfile";

function MyProfilePage() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
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
    vehicleImgs: "",
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
      dispatch(logout());
      navigation("/login");
    }
  };

  useEffect(() => {
    dispatch(__asyncAuth()).then((payload) => {
      if (payload.payload.role === "ROLE_DRIVER") {
        setCategory("드라이버 프로필");
        getMyDriverInfo();
      } else setCategory("여행자 프로필");
    });
  }, []);

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
