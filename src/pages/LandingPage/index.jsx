import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageContainer from "../../components/PageContainer";
import PartyFilter from "./PartyFilter";
import PartyList from "./PartyList";
import NewPartyButton from "./NewPartyButton";
import KakaoButton from "./KakaoButton";
import DriverMenu from "./DriverMenu";
import Title from "../../components/Title";
import DriverHome from "./DriverHome";
import UserMenu from "./UserMenu";
import MyPartyList from "./MyPartyList";

function LandingPage() {
  const user = useSelector((state) => state.user);
  const [driverMenu, setDriverMenu] = useState("driver");
  const [userMenu, setUserMenu] = useState("recommend");

  useEffect(() => {
    setDriverMenu("driver");
    setUserMenu("recommend");
  }, [user]);

  return (
    <PageContainer>
      <DriverMenu driverMenu={driverMenu} setDriverMenu={setDriverMenu} />
      {user.role === "ROLE_DRIVER" && driverMenu === "driver" ? (
        <DriverHome />
      ) : (
        <>
          <div className="mx-5 md:mx-0">
            <Title title="어디로 떠나고 싶으신가요?" />
          </div>
          <PartyFilter />
          <UserMenu userMenu={userMenu} setUserMenu={setUserMenu} />
          {userMenu === "recommend" ? <PartyList /> : <MyPartyList />}
        </>
      )}
      <NewPartyButton />
      <KakaoButton />
    </PageContainer>
  );
}

export default LandingPage;
