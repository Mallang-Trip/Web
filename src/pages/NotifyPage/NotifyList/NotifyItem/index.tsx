import { memo, MouseEvent, useCallback, useEffect, useState } from "react";
import { notificationDateToGapKorean } from "@/utils";
import { Notify, NotifyType } from "@/types";
import notifyPrimary from "@/assets/svg/notify-primary.svg";
import notifyDarkgray from "@/assets/svg/notify-darkgray.svg";
import clsx from "clsx";

interface Props extends Notify {
  clickNotifyHandler: (
    alarmId: number,
    type: NotifyType,
    targetId: number | null
  ) => void;
  deleteNotifyHandler: (alarmId: number) => void;
}

function NotifyItem({
  alarmId,
  content,
  checked,
  createdAt,
  type,
  targetId,
  clickNotifyHandler,
  deleteNotifyHandler,
}: Props) {
  const [deleted, setDeleted] = useState(false);

  const deleteHandler = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setDeleted(true);
  }, []);

  const clickHandler = useCallback(() => {
    clickNotifyHandler(alarmId, type, targetId);
  }, [alarmId, type, targetId]);

  useEffect(() => {
    if (!deleted) return;
    setTimeout(() => deleteNotifyHandler(alarmId), 550);
  }, [deleted]);

  return (
    <div
      className={clsx(
        "w-full gap-5 text-sm py-4 px-6 my-2.5 flex justify-between items-center rounded-lg cursor-pointer transition-all duration-500",
        checked ? "bg-lightgray text-darkgray" : "bg-skyblue text-primary",
        deleted ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
      )}
      onClick={clickHandler}
    >
      <div className="w-full">{content}</div>
      <div className="w-28 flex gap-4 md:gap-5 whitespace-nowrap">
        <span className="w-16 text-center">
          {notificationDateToGapKorean(createdAt)}
        </span>
        <button
          onClick={deleteHandler}
          className={clsx(
            "w-6 h-6 rounded-lg",
            checked ? "hover:bg-darkgray/30" : "hover:bg-primary/30"
          )}
        >
          <img src={checked ? notifyDarkgray : notifyPrimary} alt="닫기" />
        </button>
      </div>
    </div>
  );
}

export default memo(NotifyItem);
