import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import kakaoIcon from "../../../assets/svg/kakao-icon.svg";

function KakaoButton() {
  const user = useSelector((state) => state.user);

  return (
    <Link
      to="http://pf.kakao.com/_tfMxaG/chat"
      target="_blank"
      className={`flex items-center justify-center fixed right-6 lg:right-12 xl:right-40 bg-[#FEE500] rounded-[20px] w-14 h-14 focus:outline-none z-30 ${user.role === "ROLE_DRIVER" ? "bottom-24" : "bottom-40"}`}
    >
      <img src={kakaoIcon} alt="카카오톡 문의" />
    </Link>
  );
}

export default KakaoButton;
