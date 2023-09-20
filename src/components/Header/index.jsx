import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import profileImage from "../../assets/images/profileImage.png";
import { FaArrowLeft } from "react-icons/fa";
import {
  BsChatFill,
  BsFillPeopleFill,
  BsFillSuitHeartFill,
} from "react-icons/bs";
import { logout } from "../../redux/modules/userSlice";

function Header() {
  const user = useSelector((state) => state.user);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const mallang_header = document.getElementById("mallang_header");
    const header_profile = document.getElementById("header_profile");
    const user_menu = document.getElementById("user_menu");

    const computedStyle = window.getComputedStyle(mallang_header);
    const marginRight = parseInt(
      computedStyle.getPropertyValue("margin-right")
    );
    user_menu.style.right = "0px";
    user_menu.style.marginRight = 10 + marginRight + "px";

    const userMenuHandler = (event) => {
      if (
        header_profile.contains(event.target) ||
        user_menu.contains(event.target)
      )
        return;
      setShowUserMenu(false);
    };

    window.addEventListener("click", userMenuHandler);
    return () => {
      window.removeEventListener("click", userMenuHandler);
    };
  });

  return (
    // <nav className="fixed top-0 left-0 w-full bg-white border-gray-200">
    <nav className="w-full bg-white border-gray-200">
      <div
        id="mallang_header"
        className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto"
      >
        <button
          className="flex items-center md:hidden"
          onClick={() => navigation(-1)}
        >
          <FaArrowLeft size={20} />
        </button>
        <div className="flex flex-row">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="mr-3 h-9" alt="Mallang_Trip_Logo" />
          </Link>
        </div>
        <button className="flex items-center md:hidden">
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
            className={`${
              user.auth ? "hidden" : "flex"
            } flex-row text-[#000000] font-medium rounded-lg text-sm px-5 py-2 text-center mr-3`}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => navigation("/signup")}
            className={`${
              user.auth ? "hidden" : "flex"
            } flex-row text-[#000000] font-medium rounded-lg text-sm px-5 py-2 text-center`}
          >
            회원가입
          </button>
          <ul
            className={`${
              user.auth ? "flex" : "hidden"
            } flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-32 md:mt-0 md:border-0 md:bg-white`}
          >
            <li className="my-auto">
              <Link
                to="/"
                className="flex flex-row py-2 pl-3 pr-4 text-white rounded bg-primary md:bg-transparent md:text-primary md:p-0"
              >
                <BsChatFill className="my-auto mr-1" /> 말랑톡
              </Link>
            </li>
            <li className="my-auto">
              <Link
                to="/"
                className="flex flex-row py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0"
              >
                <BsFillPeopleFill className="my-auto mr-1" /> 커뮤니티
              </Link>
            </li>
            <li className="my-auto">
              <Link
                to="/"
                className="flex flex-row py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0"
              >
                <BsFillSuitHeartFill className="my-auto mr-1" /> 찜
              </Link>
            </li>
            <li
              className="my-auto"
              id="header_profile"
              onMouseOver={() => setShowUserMenu(true)}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <button
                type="button"
                className="flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
              >
                <img
                  className="rounded-full w-9 h-9"
                  src={user.profileImg || profileImage}
                  alt="User_Profile_Image"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative hidden max-w-screen-xl pb-4 mx-auto md:block">
        <div className="relative w-64 ml-auto mr-9 lg:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-primary"
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
          </div>
          <input
            type="text"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border-2 rounded-full border-primary focus:ring-primary focus:border-primary"
            placeholder="여행지를 검색해보세요"
          />
        </div>
      </div>
      {/* Dropdown menu */}
      <div
        id="user_menu"
        className={`${
          showUserMenu ? "block" : "hidden"
        } z-50 fixed top-10 right-0 xl:right-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow text-center`}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900">{user.name}</span>
          <span className="block text-sm text-gray-500 truncate">
            {user.email}
          </span>
        </div>
        <ul className="py-2">
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
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              예약 내역
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              작성글 내역
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              최근 본 파티
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              고객 센터
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              드라이버로 등록하기
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch(logout());
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
  );
}

export default Header;
