import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "../../utils/firebase";
import { postFirebaseToken } from "../../api/notification";
import ConfirmModal from "./ConfirmModal";

function PushNotification() {
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  const handleAllowNotification = async () => {
    if (!(await isSupported())) return;

    setShowModal(true);
    const permission = await Notification.requestPermission();
    setShowModal(false);
    if (permission !== "granted") return;

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_FCM_VAPID_KEY,
    });

    try {
      await postFirebaseToken({
        firebaseToken: token,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!user.auth) return;
    handleAllowNotification();
  }, [user]);

  return (
    <ConfirmModal
      showModal={showModal}
      setShowModal={setShowModal}
      message="알림 권한을 허용해주세요."
    />
  );
}

export default PushNotification;