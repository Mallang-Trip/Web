import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
    const META_PIXEL_TRACKING_ID = import.meta.env.VITE_META_PIXEL_TRACKING_ID;

    if (!GA_TRACKING_ID || !META_PIXEL_TRACKING_ID) return;
    // 로컬 환경의 영향을 받지 않도록 하기 위해 조건 처리
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize(GA_TRACKING_ID); //GA 초기화
      ReactPixel.init(META_PIXEL_TRACKING_ID); //메타픽셀 초기화
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send("pageview");
      ReactPixel.pageView(); //meta pixel tracker
    }
  }, [initialized, location]);

  return null;
};

export default RouteChangeTracker;
