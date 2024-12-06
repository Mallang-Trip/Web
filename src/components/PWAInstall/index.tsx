import { useState, useEffect, useMemo, memo, useCallback } from "react";
import InstallModal from "./InstallModal";

function PWAInstall() {
  const UA = useMemo(() => navigator.userAgent.toLowerCase(), []);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | undefined>(
    undefined
  );

  const isAndroid = useMemo(() => UA.indexOf("android") > -1, [UA]);
  const isIos = useMemo(
    () =>
      UA.indexOf("iphone") > -1 ||
      UA.indexOf("ipad") > -1 ||
      UA.indexOf("ipod") > -1,
    [UA]
  );

  const storeURL = useMemo(
    () =>
      isIos
        ? "https://apps.apple.com/us/app/%EB%A7%90%EB%9E%91%ED%8A%B8%EB%A6%BD/id6736914599"
        : "https://play.google.com/store/apps/details?id=com.mallangtrip.www",
    [isIos]
  );

  const handleInstallClick = useCallback(() => {
    const newWindow = window.open(storeURL, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }, [storeURL]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    if (!deferredPrompt || showInstallModal) return;
    setTimeout(() => setShowInstallModal(true), 2000);
  }, [deferredPrompt]);

  if (!isAndroid && !isIos) return null;
  return (
    <InstallModal
      showModal={showInstallModal}
      setShowModal={setShowInstallModal}
      handleInstallClick={handleInstallClick}
    />
  );
}

export default memo(PWAInstall);
