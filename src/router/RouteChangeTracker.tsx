import { memo, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GA_TRACKING_ID, isGAlive, META_PIXEL_TRACKING_ID } from "../utils/ga";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isGAlive()) {
      ReactGA.initialize(GA_TRACKING_ID);
      ReactPixel.init(META_PIXEL_TRACKING_ID);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactPixel.pageView();
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname,
        title: getPageTitle(location.pathname),
      });
    }
  }, [initialized, location]);

  const getPageTitle = useCallback((url: string) => {
    if (url === "/") return "말랑트립";
    if (url === "/intro") return "회사 소개";
    if (url.startsWith("/policy")) return "약관";
    if (url.startsWith("/party/new")) return "새로운 파티";
    if (url.startsWith("/party")) return "파티 페이지";
    if (url.startsWith("/driver/profile")) return "드라이버 프로필";
    if (url.startsWith("/my/driver/course")) return "드라이버 코스";
    if (url.startsWith("/search/place")) return "여행지 검색";
    if (url.startsWith("/destination/detail")) return "여행지 정보";
    if (url.startsWith("/community/search")) return "커뮤니티 검색";
    if (url.startsWith("/community/post")) return "커뮤니티 게시글 작성";
    if (url.startsWith("/community")) return "커뮤니티";
    if (url.startsWith("/help")) return "고객센터";
    if (url.startsWith("/admin")) return "관리자";
    if (url.startsWith("/login/search")) return "계정 찾기";
    if (url === "/my/menu") return "나의 프로필";
    if (url === "/my/profile") return "나의 프로필";
    if (url === "/my/heart") return "나의 찜";
    if (url === "/my/article") return "나의 게시글";
    if (url === "/my/reservation") return "예약 내역";
    if (url === "/my/payment") return "결제 수단 관리";
    if (url === "/my/payment/list") return "나의 결제/환불 내역";
    if (url === "/my/party/history") return "최근 본 파티";
    if (url === "/my/driver/apply") return "드라이버 등록";
    if (url === "/my/driver/income") return "드라이버 수익";
    if (url === "/talk") return "말랑챗";
    if (url === "/notify") return "받은 알림";
    if (url === "/login") return "로그인";
    if (url === "/signup") return "회원가입";
    return "말랑트립";
  }, []);

  return null;
};

export default memo(RouteChangeTracker);
