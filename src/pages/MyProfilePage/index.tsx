import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __asyncAuth, logout } from "@/redux/modules/userSlice";
import { getDriverMyInfo } from "@/api/driver";
import { AppDispatch } from "@/redux/store";
import { DriverInfo } from "@/types";
import { PageContainer } from "@/components";
import Header from "./Header";
import UserProfile from "./UserProfile";
import DriverProfile from "./DriverProfile";

function MyProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const [category, setCategory] = useState("");
  const [driverInfo, setDriverInfo] = useState<DriverInfo>({
    accountHolder: "",
    accountNumber: "",
    bank: "",
    courses: [],
    driverLicenceImg: "",
    holidays: [],
    insuranceLicenceImg: "",
    introduction: "",
    name: "",
    phoneNumber: "",
    prices: [],
    profileImg: null,
    region: [],
    status: "",
    taxiLicenceImg: "",
    userId: 0,
    vehicleCapacity: 0,
    vehicleImgs: [],
    vehicleModel: "",
    vehicleNumber: "",
    weeklyHoliday: [],
  });

  const getMyDriverInfo = useCallback(async () => {
    try {
      const result = await getDriverMyInfo();
      setDriverInfo(result.payload);
    } catch (e) {
      console.log(e);
      dispatch(logout());
      navigation("/login");
    }
  }, []);

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

export default memo(MyProfilePage);
