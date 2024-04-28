import { useLocation } from "react-router-dom";
import Company from "./Company";
import Policy from "./Policy";

function Footer() {
  const location = useLocation();

  if (location.pathname.slice(0, 6) === "/admin") return null;
  return (
    <div className="cursor-default bg-[#fafafa]">
      <hr className="bg-[#eaeaea] mt-14 mb-7 h-px border-0" />
      <div className="max-w-screen-xl mx-auto">
        <Company />
        <Policy />
      </div>
    </div>
  );
}

export default Footer;
