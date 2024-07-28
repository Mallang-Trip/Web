import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "../../utils/firebase";
import { putFirebaseToken } from "../../api/notification";
import CheckModal from "./CheckModal";

function PushNotification() {
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  const sendFirebaseToken = async () => {
    const token =
      localStorage.getItem("fcmToken") ||
      (await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_FCM_VAPID_KEY,
      }));

    localStorage.setItem("fcmToken", token);

    try {
      await putFirebaseToken({
        firebaseToken: token,
      });
    } catch (e) {
      console.log(e);
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js");
    }
  };

  const handleAllowNotification = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") sendFirebaseToken();
    setShowModal(false);
  };

  const setNotification = async () => {
    if (!(await isSupported())) return;
    if (Notification.permission === "granted") sendFirebaseToken();
    if (Notification.permission === "default") setShowModal(true);
  };

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

export default PushNotification;
