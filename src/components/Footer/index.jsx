import { useLocation } from "react-router-dom";
import Company from "./Company";
import Policy from "./Policy";

function Footer() {
  const location = useLocation();

  if (location.pathname.slice(0, 6) === "/admin") return null;
  return (
    <div className="cursor-default max-w-screen-xl mx-auto">
      <hr className="bg-darkgray/20 mt-14 mb-7 h-px border-0 mx-5" />
      <Company />
      <Policy />
    </div>
  );
}

export default Footer;
