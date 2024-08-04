import { useState, useEffect } from "react";
import PWAPrompt from "react-ios-pwa-prompt";
import InstallModal from "./InstallModal";

function PWAInstall() {
  const UA = navigator.userAgent.toLowerCase();
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(undefined);

  const isAndroid = UA.indexOf("android") > -1;
  const isIos =
    UA.indexOf("iphone") > -1 ||
    UA.indexOf("ipad") > -1 ||
    UA.indexOf("ipod") > -1;

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        setShowInstallModal(false);
      }
    });
  };

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event || null);
  };

  useEffect(() => {
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

  if (isAndroid)
    return (
      <InstallModal
        showModal={showInstallModal}
        setShowModal={setShowInstallModal}
        handleInstallClick={handleInstallClick}
      />
    );
  if (isIos)
    return (
      <PWAPrompt
        promptOnVisit={1}
        timesToShow={20}
        copyTitle="말랑트립 앱 설치"
        copyBody="편리한 말랑트립 사용을 위해 아래 절차에 따라 앱을 설치하는 것을 권장합니다."
        copyShareButtonLabel="1. 브라우저 메뉴에서 공유 버튼을 누릅니다."
        copyAddHomeButtonLabel="2. '홈 화면에 추가' 버튼을 누릅니다."
        copyClosePrompt="닫기"
        permanentlyHideOnDismiss={false}
      />
    );
}

export default PWAInstall;
