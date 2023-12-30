import { useEffect, useState } from "react";
import notifyPrimary from "../../../../assets/svg/notify-primary.svg";
import notifyDarkgray from "../../../../assets/svg/notify-darkgray.svg";

function NotifyItem({ id, content, date, read, deleteNotifyHandler }) {
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (!deleted) return;

    setTimeout(() => deleteNotifyHandler(id), 550);
  }, [deleted]);

  return (
    <div
      className={`w-full gap-5 text-sm py-4 px-6 my-2.5 flex justify-between items-center rounded-lg transition-all duration-500 ${
        read ? "bg-lightgray text-darkgray" : "bg-skyblue text-primary"
      } ${
        deleted ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <div className="w-full">{content}</div>
      <div className="w-24 flex gap-5 whitespace-nowrap">
        <span>{date}</span>
        <button onClick={() => setDeleted(true)} className="w-6 h-6">
          <img src={read ? notifyDarkgray : notifyPrimary} alt="닫기" />
        </button>
      </div>
    </div>
  );
}

export default NotifyItem;
