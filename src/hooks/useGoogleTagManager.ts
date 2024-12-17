import { useEffect } from "react";
import { GTM_ID } from "@/utils/ga";
import TagManager from "react-gtm-module";

export const useGoogleTagManager = () => {
  useEffect(() => {
    if (!GTM_ID) return;
    if (window.location.hostname === "localhost") return;
    TagManager.initialize({ gtmId: GTM_ID });
  }, [GTM_ID]);
};
