import { memo } from "react";
import { NotiMailData } from "../..";
import clsx from "clsx";

interface Props extends NotiMailData {
  current: number;
}

function NotiMailItem({
  current,
  userType,
  contentType,
  content,
  title,
  createdAt,
}: Props) {
  return (
    <div className="flex items-center w-full px-5 py-3 h-10 border border-solid border-gray300 hover:border-primary rounded-xl mb-2 text-sm font-medium text-gray500 cursor-pointer">
      <div className="w-1/5">
        {userType === "user" ? "일반 회원" : "드라이버 회원"}
        {current === 0 && "용"}
      </div>
      <div
        className={clsx(
          "flex items-center pr-3",
          current === 0 ? "w-1/5" : "flex-1 text-gray800"
        )}
      >
        {current === 0 ? contentType : title}
      </div>
      <div className={clsx(current === 0 ? "flex-1 text-gray800" : "w-1/5")}>
        {current === 0 ? content : createdAt.slice(0, 10).replaceAll("-", ".")}
      </div>
      <button className="w-12 text-[#f00] font-bold">삭제</button>
    </div>
  );
}

export default memo(NotiMailItem);
