import { memo, useCallback, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Ping } from "@/components";
import basicProfileImage from "@/assets/images/profileImage.png";
import Talk from "@/assets/svg/bottom-talk.svg";
import Community from "@/assets/svg/bottom-community.svg";
import Home from "@/assets/svg/bottom-home.svg";
import Heart from "@/assets/svg/bottom-heart.svg";
import TalkPrimary from "@/assets/svg/bottom-talk-primary.svg";
import CommunityPrimary from "@/assets/svg/bottom-community-primary.svg";
import HomePrimary from "@/assets/svg/bottom-home-primary.svg";
import HeartPrimary from "@/assets/svg/bottom-heart-primary.svg";
import clsx from "clsx";

function BottomNav() {
  const navigation = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const uncheckedCount = useSelector(
    (state: RootState) => state.notification.uncheckedCount
  );
  const [searchParams] = useSearchParams();
  const [isWebView, _] = useState(
    searchParams.get("webview") || localStorage.getItem("isWebView")
  );

  const checkLocation = useCallback(() => {
    if (location.pathname === "/talk") return "talk";
    else if (location.pathname.substring(0, 10) === "/community")
      return "community";
    else if (location.pathname === "/my/heart") return "my_heart";
    else if (
      location.pathname.substring(0, 3) === "/my" ||
      location.pathname.substring(0, 7) === "/notify" ||
      location.pathname.substring(0, 5) === "/help" ||
      location.pathname.substring(0, 6) === "/admin"
    )
      return "my";
    else return "home";
  }, [location.pathname]);

  if (isWebView) return null;
  return (
    <div className="fixed bottom-0 left-0 z-40 w-full h-20 bg-white border-t border-x border-mediumgray rounded-t-2xl md:hidden">
      <div className="grid h-full pb-4-safe max-w-lg grid-cols-5 mx-auto font-medium">
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0"
          onClick={() => navigation("/talk")}
        >
          {checkLocation() === "talk" ? (
            <img src={TalkPrimary} alt="말랑챗" className="w-6 h-4 mb-1" />
          ) : (
            <img src={Talk} alt="말랑챗" className="w-6 h-4 mb-1" />
          )}
          <span
            className={clsx(
              "text-xs",
              checkLocation() === "talk" ? "text-primary" : "text-[#B7BFC2]"
            )}
          >
            말랑챗
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0"
          onClick={() => navigation("/community/main")}
        >
          {checkLocation() === "community" ? (
            <img
              src={CommunityPrimary}
              alt="커뮤니티"
              className="w-6 h-4 mb-1"
            />
          ) : (
            <img src={Community} alt="커뮤니티" className="w-6 h-4 mb-1" />
          )}
          <span
            className={clsx(
              "text-xs",
              checkLocation() === "community"
                ? "text-primary"
                : "text-[#B7BFC2]"
            )}
          >
            커뮤니티
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0"
          onClick={() => navigation("/")}
        >
          {checkLocation() === "home" ? (
            <img src={HomePrimary} alt="홈" className="w-6 h-4 mb-1" />
          ) : (
            <img src={Home} alt="홈" className="w-6 h-4 mb-1" />
          )}
          <span
            className={clsx(
              "text-xs",
              checkLocation() === "home" ? "text-primary" : "text-[#B7BFC2]"
            )}
          >
            홈
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0"
          onClick={() => navigation("/my/heart")}
        >
          {checkLocation() === "my_heart" ? (
            <img src={HeartPrimary} alt="찜" className="w-6 h-4 mb-1" />
          ) : (
            <img src={Heart} alt="찜" className="w-6 h-4 mb-1" />
          )}
          <span
            className={clsx(
              "text-xs",
              checkLocation() === "my_heart" ? "text-primary" : "text-[#B7BFC2]"
            )}
          >
            찜
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-0 relative"
          onClick={() => navigation("/my/menu")}
        >
          <img
            className={clsx(
              "w-9 h-9 rounded-full object-cover",
              checkLocation() === "my" && "ring-2 ring-primary ring-offset-1"
            )}
            src={user.profileImg || basicProfileImage}
            alt="User_Profile_Image"
          />
          {uncheckedCount > 0 && <Ping top="3" left="7" />}
        </button>
      </div>
    </div>
  );
}

export default memo(BottomNav);
