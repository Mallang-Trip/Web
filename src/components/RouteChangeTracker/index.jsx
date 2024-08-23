// RouteChangeTracker.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // 로컬 환경의 영향을 받지 않도록 하기 위해 조건 처리
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
    }
    setInitialized(true);
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
