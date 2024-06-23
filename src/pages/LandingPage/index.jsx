import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckModal from "../../components/CheckModal";
import Title from "../../components/Title";
import PartyFilter from "./PartyFilter";
import PartyList from "./PartyList";
import KakaoButton from "./KakaoButton";
import DriverMenu from "./DriverMenu";
import DriverHome from "./DriverHome";
import UserMenu from "./UserMenu";
import MyPartyList from "./MyPartyList";
import NewMyParty from "./NewMyParty";

function LandingPage() {
  const navigation = useNavigate();
  const user = useSelector((state) => state.user);
  const [driverMenu, setDriverMenu] = useState("driver");
  const [userMenu, setUserMenu] = useState("recommend");
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    setDriverMenu("driver");
    setUserMenu("recommend");
  }, [user]);

  return (
    <div className="min-h-[800px] mb-24">
      <DriverMenu driverMenu={driverMenu} setDriverMenu={setDriverMenu} />
      {user.role === "ROLE_DRIVER" && driverMenu === "driver" ? (
        <DriverHome />
      ) : (
        <>
          <div className="max-w-screen-xl mx-auto px-2 md:px-5">
            <div className="mx-5 md:mx-0">
              <Title title="어디로 떠나고 싶으신가요?" />
            </div>
            <PartyFilter setShowLoginModal={setShowLoginModal} />
          </div>
          <NewMyParty setShowLoginModal={setShowLoginModal} />
          <div className="max-w-screen-xl mx-auto px-2 md:px-5">
            <UserMenu userMenu={userMenu} setUserMenu={setUserMenu} />
            {userMenu === "recommend" ? <PartyList /> : <MyPartyList />}
          </div>
        </>
      )}

      <KakaoButton />
      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText="취소"
        yesText="확인"
        yesHandler={() => navigation("/login")}
      />
    </div>
  );
}

export default LandingPage;
