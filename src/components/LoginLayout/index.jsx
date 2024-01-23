import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import BottomInfo from "../../pages/IntroPage/BottomInfo";

function LoginLayout() {
  return (
    <>
      <Outlet />
      <BottomInfo />
      <Footer />
    </>
  );
}

export default LoginLayout;
