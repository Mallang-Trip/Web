import { useEffect, useState } from "react";
import { notificationDateToGapKorean } from "../../../../utils";
import notifyPrimary from "../../../../assets/svg/notify-primary.svg";
import notifyDarkgray from "../../../../assets/svg/notify-darkgray.svg";

function NotifyItem({
  alarmId,
  content,
  checked,
  createdAt,
  type,
  targetId,
  clickNotifyHandler,
  deleteNotifyHandler,
}) {
  const [deleted, setDeleted] = useState(false);

  const deleteHandler = (e) => {
    e.stopPropagation();
    setDeleted(true);
  };

  useEffect(() => {
    if (!deleted) return;
    setTimeout(() => deleteNotifyHandler(alarmId), 550);
  }, [deleted]);

  return (
    <div
      className={`w-full gap-5 text-sm py-4 px-6 my-2.5 flex justify-between items-center rounded-lg cursor-pointer transition-all duration-500 ${
        checked ? "bg-lightgray text-darkgray" : "bg-skyblue text-primary"
      } ${
        deleted ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
      onClick={() => clickNotifyHandler(alarmId, type, targetId)}
    >
      <div className="w-full">{content}</div>
      <div className="w-28 flex gap-4 md:gap-5 whitespace-nowrap">
        <span className="w-16 text-center">
          {notificationDateToGapKorean(createdAt)}
        </span>
        <button
          onClick={deleteHandler}
          className={`w-6 h-6 rounded-lg ${
            checked ? "hover:bg-darkgray/30" : "hover:bg-primary/30"
          }`}
        >
          <img src={checked ? notifyDarkgray : notifyPrimary} alt="닫기" />
        </button>
      </div>
    </div>
  );
}

export default NotifyItem;
