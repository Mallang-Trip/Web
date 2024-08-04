import { useEffect } from "react";
import TagManager from "react-gtm-module";

function useGoogleTagManager() {
  const GTM_ID = import.meta.env.VITE_GTM_ID;

  useEffect(() => {
    if (!GTM_ID) return;
    if (window.location.hostname === "localhost") return;
    TagManager.initialize({ gtmId: GTM_ID });
  }, [GTM_ID]);
}

export default useGoogleTagManager;
