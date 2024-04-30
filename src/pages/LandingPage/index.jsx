import { useState } from "react";
import { useSelector } from "react-redux";
import PageContainer from "../../components/PageContainer";
import PartyFilter from "./PartyFilter";
import PartyList from "./PartyList";
import NewPartyButton from "./NewPartyButton";
import KakaoButton from "./KakaoButton";
import DriverMenu from "./DriverMenu";
import Title from "../../components/Title";
import DriverHome from "./DriverHome";

function LandingPage() {
  const user = useSelector((state) => state.user);
  const [driverMenu, setDriverMenu] = useState("driver");

  return (
    <PageContainer>
      <DriverMenu driverMenu={driverMenu} setDriverMenu={setDriverMenu} />
      {user.role === "ROLE_DRIVER" && driverMenu === "driver" ? (
        <DriverHome />
      ) : (
        <>
          <Title title="어디로 떠나고 싶으신가요?" />
          <PartyFilter />
          <Title
            title={
              user.nickname
                ? `${user.nickname} 님께 추천하는 파티`
                : "추천 파티"
            }
          />
          <PartyList />
        </>
      )}
      <NewPartyButton />
      <KakaoButton />
    </PageContainer>
  );
}

export default LandingPage;
