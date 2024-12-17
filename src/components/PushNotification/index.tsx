import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "@/utils/firebase";
import { vapidKey } from "@/utils/env";
import { putFirebaseToken } from "@/api/notification";
import CheckModal from "./CheckModal";

function PushNotification() {
  const user = useSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = useState(false);

  const sendFirebaseToken = useCallback(async () => {
    if (!messaging) return;

    const firebaseToken =
      localStorage.getItem("fcmToken") ||
      (await getToken(messaging, { vapidKey }));

    localStorage.setItem("fcmToken", firebaseToken);

    try {
      await putFirebaseToken({ firebaseToken });
    } catch (e) {
      console.log(e);
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js");
    }
  }, [messaging, vapidKey]);

  const handleAllowNotification = useCallback(async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") sendFirebaseToken();
    setShowModal(false);
  }, [sendFirebaseToken]);

  const setNotification = useCallback(async () => {
    if (!(await isSupported())) return;
    if (Notification.permission === "granted") sendFirebaseToken();
    if (Notification.permission === "default") setShowModal(true);
  }, [isSupported, sendFirebaseToken]);

  useEffect(() => {
    if (!user.auth) return;
    setNotification();
  }, [user]);

  return (
    <CheckModal
      showModal={showModal}
      setShowModal={setShowModal}
      message={
        "말랑트립 예약 및 결제 등\n중요한 업데이트 정보 전달을 위해\n알림 권한을 허용해주세요."
      }
      noText="취소"
      yesText="확인"
      yesHandler={() => handleAllowNotification()}
    />
  );
}

export default memo(PushNotification);
