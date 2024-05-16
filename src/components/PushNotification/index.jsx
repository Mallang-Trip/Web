import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getToken, onMessage, isSupported } from "firebase/messaging";
import { messaging } from "../../utils/firebase";

function PushNotification() {
  const user = useSelector((state) => state.user);

  const handleAllowNotification = async () => {
    if (!(await isSupported())) return;
    const permission = await Notification.requestPermission();

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_FCM_VAPID_KEY,
    });

    // 서버로 permission, token 전송 (알림 허용 여부, 토큰)
    // console.log(permission);
    console.log(token);

    onMessage(messaging, (payload) => {
      console.log("메시지가 도착했습니다.", payload);
    });
  };

  useEffect(() => {
    if (!user.auth) return;
    handleAllowNotification();
  }, [user]);

  return null;
}

export default PushNotification;
