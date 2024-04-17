import Company from "./Company";
import Policy from "./Policy";

function Footer() {
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
