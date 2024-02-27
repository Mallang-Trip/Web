import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotification, putNotification } from "../../../api/notification";
import NotifyItem from "./NotifyItem";
import EmptyNotify from "./EmptyNotify";

function NotifyList() {
  const navigation = useNavigate();
  const [notify, setNotify] = useState([]);
  const url = {
    PARTY: "/party/detail/",
    ARTICLE: "/community/",
    DRIVER: "/driver/profile/",
  };

  const clickNotifyHandler = (alarmId, type, targetId) => {
    putNotification(alarmId);
    if (type !== "NONE") navigation(url[type] + targetId);
  };

  const deleteNotifyHandler = (alarmId) => {
    setNotify(notify.filter((item) => item.alarmId !== alarmId));
  };

  const getNotificationFunc = async () => {
    try {
      const result = await getNotification();
      setNotify(result.payload.contents);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNotificationFunc();
  }, []);

  return (
    <div className="w-full">
      {notify.length === 0 ? (
        <EmptyNotify />
      ) : (
        notify.map((item) => (
          <NotifyItem
            key={item.alarmId}
            clickNotifyHandler={clickNotifyHandler}
            deleteNotifyHandler={deleteNotifyHandler}
            {...item}
          />
        ))
      )}
    </div>
  );
}

export default NotifyList;
