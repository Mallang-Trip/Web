import { Link } from "react-router-dom";
import kakaoIcon from "../../../assets/images/kakaoIcon.png";

function KakaoButton() {
  return (
    <Link
      to="http://pf.kakao.com/_tfMxaG/chat"
      target="_blank"
      className="flex items-center justify-center fixed bottom-24 right-6 lg:right-12 xl:right-40 rounded-full w-14 h-14 focus:outline-none"
    >
      <img
        src={kakaoIcon}
        className="w-full h-full rounded-full"
        alt="카카오톡 문의"
      />
    </Link>
  );
}

export default KakaoButton;
