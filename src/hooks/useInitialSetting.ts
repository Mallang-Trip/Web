import { useEffect } from "react";

const setScreenHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

const setAutoLogin = () => {
  if (localStorage.getItem("autoLogin") !== "false") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("autoLogin");
};

const setColorTheme = () => {
  // if (
  //   localStorage.getItem("color-theme") === "dark" ||
  //   (!("color-theme" in localStorage) &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches)
  // ) {
  //   document.documentElement.classList.add("dark");
  //   localStorage.setItem("color-theme", "dark");
  // } else {
  //   document.documentElement.classList.remove("dark");
  //   localStorage.setItem("color-theme", "light");
  // }
  /* 우선, 라이트 모드만 적용 (다크 모드 기획 없음) */
  document.documentElement.classList.remove("dark");
  localStorage.setItem("color-theme", "light");
};

export const useInitialSetting = () => {
  useEffect(() => {
    setColorTheme();
    setScreenHeight();

    window.addEventListener("unload", setAutoLogin);
    window.addEventListener("resize", setScreenHeight);
    return () => {
      window.removeEventListener("unload", setAutoLogin);
      window.removeEventListener("resize", setScreenHeight);
    };
  }, []);
};
