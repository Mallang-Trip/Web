import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/modules/userSlice";
import { RootState } from "@/redux/store";
import { setNotification } from "@/redux/modules/notificationSlice";
import { getNotification } from "@/api/notification";
import { Ping, CheckModal } from "@/components";
import { isIosPwa } from "@/utils";
import Logo from "@/assets/images/logo.png";
import basicProfileImage from "@/assets/images/profileImage.png";
import headerBack from "@/assets/svg/header-back.svg";
import HeaderChat from "@/assets/svg/HeaderChat.svg";
import HeaderChatPrimary from "@/assets/svg/HeaderChatPrimary.svg";
import HeaderCommunity from "@/assets/svg/HeaderCommunity.svg";
import HeaderCommunityPrimary from "@/assets/svg/HeaderCommunityPrimary.svg";
import HeaderHeart from "@/assets/svg/HeaderHeart.svg";
import HeaderHeartPrimary from "@/assets/svg/HeaderHeartPrimary.svg";
import clsx from "clsx";

function Header() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const uncheckedCount = useSelector(
    (state: RootState) => state.notification.uncheckedCount
  );
  const [notificationTimer, setNotificationTimer] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const mallang_header = useRef<HTMLDivElement | null>(null);
  const header_profile = useRef<HTMLLIElement | null>(null);
  const user_menu = useRef<HTMLDivElement | null>(null);
  const [searchParams] = useSearchParams();
  const [isWebView, _] = useState(
    searchParams.get("webview") || localStorage.getItem("isWebView")
  );

  const getMenuPosition = useCallback(() => {
    const x = header_profile.current?.getBoundingClientRect()?.x;
    if (x === undefined) return 0;
    else return x - 140;
  }, [header_profile.current]);

  const getNotificationFunc = useCallback(async () => {
    try {
      const result = await getNotification();
      dispatch(setNotification(result.payload));
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (!user.auth) {
      if (!notificationTimer) return;
      clearInterval(notificationTimer);
      setNotificationTimer(undefined);
      dispatch(setNotification({ contents: [], uncheckedCount: 0 }));
    } else {
      if (notificationTimer) return;
      getNotificationFunc();
      setNotificationTimer(
        setInterval(() => {
          getNotificationFunc();
        }, 60 * 1000)
      );
    }
  }, [user.auth]);

  useEffect(() => {
    const userMenuHandler = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (
        header_profile.current?.contains(target) ||
        user_menu.current?.contains(target)
      )
        return;
      setShowUserMenu(false);
    };

    window.addEventListener("click", userMenuHandler);
    return () => {
      window.removeEventListener("click", userMenuHandler);
    };
  }, []);

  if (isWebView) return null;
  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white border-gray-200 z-50">
        <div
          ref={mallang_header}
          className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto"
        >
          <button
            className="flex items-center md:hidden w-6 h-6"
            onClick={() => navigation(-1)}
            disabled={location.pathname === "/"}
          >
            {location.pathname !== "/" && (
              <img src={headerBack} alt="back" className="w-6 h-6" />
            )}
          </button>
          <div className="flex flex-row">
            <button
              onClick={() => navigation("/")}
              className="flex items-center"
            >
              <img src={Logo} className="mr-3 w-28" alt="Mallang_Trip_Logo" />
            </button>
          </div>
          <button
            className="flex items-center md:hidden"
            onClick={() => navigation("/search/place/null")}
          >
            <svg
              className="w-6 h-6 text-primary"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <button
              type="button"
              onClick={() => navigation("/login")}
              className={clsx(
                "flex-row text-black font-medium rounded-lg text-sm px-5 py-2 text-center mr-3",
                user.auth ? "hidden" : "flex"
              )}
            >
              로그인
            </button>
            {isIosPwa() ? (
              <Link
                to="http://www.mallangtrip.kro.kr"
                target="_blank"
                className={clsx(
                  "flex-row text-black font-medium rounded-lg text-sm px-5 py-2 text-center",
                  user.auth ? "hidden" : "flex"
                )}
              >
                회원가입
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => navigation("/signup")}
                className={clsx(
                  "flex-row text-black font-medium rounded-lg text-sm px-5 py-2 text-center",
                  user.auth ? "hidden" : "flex"
                )}
              >
                회원가입
              </button>
            )}
            <ul
              className={clsx(
                "flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-20 lg:space-x-32 md:mt-0 md:border-0 md:bg-white",
                user.auth ? "flex" : "hidden"
              )}
            >
              <li className="my-auto">
                <button
                  onClick={() => navigation("/talk")}
                  className={clsx(
                    "flex items-center py-2 pl-3 pr-4 bg-transparent md:hover:text-primary md:p-0",
                    location.pathname.substring(0, 5) === "/talk"
                      ? "text-primary"
                      : "text-gray-900"
                  )}
                >
                  <img
                    src={
                      location.pathname.substring(0, 5) === "/talk"
                        ? HeaderChatPrimary
                        : HeaderChat
                    }
                    alt="말랑챗"
                  />
                  <span className="mx-1">말랑챗</span>
                </button>
              </li>
              <li className="my-auto">
                <button
                  onClick={() => navigation("/community/main")}
                  className={clsx(
                    "flex items-center py-2 pl-3 pr-4 bg-transparent md:hover:text-primary md:p-0",
                    location.pathname.substring(0, 10) === "/community"
                      ? "text-primary"
                      : "text-gray-900"
                  )}
                >
                  <img
                    src={
                      location.pathname.substring(0, 10) === "/community"
                        ? HeaderCommunityPrimary
                        : HeaderCommunity
                    }
                    alt="커뮤니티"
                  />
                  <span className="mx-1">커뮤니티</span>
                </button>
              </li>
              <li className="my-auto">
                <button
                  onClick={() => navigation("/my/heart")}
                  className={clsx(
                    "flex items-center py-2 pl-3 pr-4 bg-transparent md:hover:text-primary md:p-0",
                    location.pathname === "/my/heart"
                      ? "text-primary"
                      : "text-gray-900"
                  )}
                >
                  <img
                    src={
                      location.pathname === "/my/heart"
                        ? HeaderHeartPrimary
                        : HeaderHeart
                    }
                    alt="찜"
                  />
                  <span className="mx-1">찜</span>
                </button>
              </li>
              <li
                className="my-auto"
                ref={header_profile}
                onMouseOver={() => setShowUserMenu(true)}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <button
                  type="button"
                  className="flex mr-3 text-sm rounded-full md:mr-0 relative"
                >
                  <img
                    className="rounded-full w-9 h-9 object-cover"
                    src={user.profileImg || basicProfileImage}
                    alt="User_Profile_Image"
                  />
                  {uncheckedCount > 0 && (
                    <span className="relative top-0 right-6">
                      <Ping top="0" left="0" />
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* Dropdown menu */}
        <div
          ref={user_menu}
          className={clsx(
            "z-50 fixed top-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow text-center",
            showUserMenu ? "block" : "hidden"
          )}
          style={{
            left: getMenuPosition(),
          }}
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900">{user.name}</span>
            <span className="block text-sm text-gray-500 truncate">
              {user.email}
            </span>
          </div>
          <ul className="py-2">
            {user.isAdmin && (
              <li>
                <button
                  onClick={() => {
                    navigation("/admin/home");
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  관리자
                </button>
              </li>
            )}
            <li>
              <button
                onClick={() => {
                  navigation("/my/profile");
                  setShowUserMenu(false);
                }}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                나의 프로필
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigation("/notify");
                  setShowUserMenu(false);
                }}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative"
              >
                알림
                {uncheckedCount > 0 && <Ping top="1.5" left="1/2" />}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigation("/my/payment");
                  setShowUserMenu(false);
                }}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                결제 수단 관리
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigation("/my/payment/list");
                  setShowUserMenu(false);
                }}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                결제 내역
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigation("/my/reservation");
                  setShowUserMenu(false);
                }}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                예약 내역
              </button>
            </li>
            {user.role === "ROLE_DRIVER" && (
              <li>
                <button
                  onClick={() => {
                    navigation("/my/driver/income");
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  수익 내역
                </button>
              </li>
            )}
            <li>
              <button
                onClick={() => {
                  navigation("/my/article");
                  setShowUserMenu(false);
                }}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                작성글 내역
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigation("/my/party/history");
                  setShowUserMenu(false);
                }}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                최근 본 일정
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigation("/help/list");
                  setShowUserMenu(false);
                }}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                고객 센터
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigation("/my/driver/apply");
                  setShowUserMenu(false);
                }}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                드라이버로 등록하기
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowLogoutModal(true);
                  setShowUserMenu(false);
                }}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="h-20 md:h-24" />

      <CheckModal
        showModal={showLogoutModal}
        setShowModal={setShowLogoutModal}
        message="로그아웃 하시겠습니까?"
        noText="취소"
        yesText="확인"
        yesHandler={() => {
          dispatch(logout());
          setShowUserMenu(false);
          setShowLogoutModal(false);
          navigation("/", { replace: true });
        }}
      />
    </>
  );
}

export default memo(Header);
