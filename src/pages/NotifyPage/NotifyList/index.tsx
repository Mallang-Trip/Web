import { memo, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { NotifyType } from "../../../types";
import {
  setDeleteNotification,
  setNotification,
} from "../../../redux/modules/notificationSlice";
import {
  deleteNotification,
  getNotification,
  putNotification,
  putAllNotification,
} from "../../../api/notification";
import NotifyItem from "./NotifyItem";
import EmptyNotify from "./EmptyNotify";

function NotifyList() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const notification = useSelector(
    (state: RootState) => state.notification.notification
  );
  const uncheckedCount = useSelector(
    (state: RootState) => state.notification.uncheckedCount
  );

  const url = useMemo(
    () => ({
      PARTY: "/party/detail/",
      ARTICLE: "/community/",
      DRIVER: "/driver/profile/",
    }),
    []
  );

  const clickAllNotifyHandler = useCallback(async () => {
    await putAllNotification();
    await getNotificationFunc();
  }, []);

  const clickNotifyHandler = useCallback(
    async (alarmId: number, type: NotifyType, targetId: number | null) => {
      await putNotification(alarmId);
      if (type === "NONE") getNotificationFunc();
      else {
        const targetUrl = url[type] + targetId;
        if (targetUrl) navigation(url[type] + targetId);
        else getNotificationFunc();
      }
    },
    [url]
  );

  const deleteNotifyHandler = useCallback((alarmId: number) => {
    deleteNotification(alarmId);
    dispatch(setDeleteNotification(alarmId));
  }, []);

  const getNotificationFunc = useCallback(async () => {
    try {
      const result = await getNotification();
      dispatch(setNotification(result.payload));
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getNotificationFunc();
  }, []);

  return (
    <div className="w-full">
      {uncheckedCount > 0 && (
        <button
          className="flex justify-end items-center bg-white text-darkgray border border-mediumgray text-xs rounded-lg px-4 py-3 mb-3 ml-auto"
          onClick={clickAllNotifyHandler}
        >
          전체 알림 확인
        </button>
      )}
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

export default memo(NotifyList);
