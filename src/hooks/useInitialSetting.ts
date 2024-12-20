import { useEffect } from "react";
import { setAutoLogin, setColorTheme, setScreenHeight } from "@/utils";

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
