import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function LoginLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default LoginLayout;
