import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteNotification,
  setNotification,
} from "../../../redux/modules/notificationSlice";
import {
  deleteNotification,
  getNotification,
  putNotification,
} from "../../../api/notification";
import NotifyItem from "./NotifyItem";
import EmptyNotify from "./EmptyNotify";

function NotifyList() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);
  const url = {
    PARTY: "/party/detail/",
    ARTICLE: "/community/",
    DRIVER: "/driver/profile/",
  };

  const clickNotifyHandler = (alarmId, type, targetId) => {
    putNotification(alarmId);
    if (type === "NONE") getNotificationFunc();
    else navigation(url[type] + targetId);
  };

  const deleteNotifyHandler = (alarmId) => {
    deleteNotification(alarmId);
    dispatch(setDeleteNotification(alarmId));
  };

  const getNotificationFunc = async () => {
    try {
      const result = await getNotification();
      dispatch(setNotification(result.payload));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNotificationFunc();
  }, []);

  return (
    <div className="w-full">
      {notification.length === 0 ? (
        <EmptyNotify />
      ) : (
        notification.map((item) => (
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
