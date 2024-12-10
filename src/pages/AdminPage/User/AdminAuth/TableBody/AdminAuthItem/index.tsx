import { memo } from "react";

interface Props {
  username: string;
  userId: number;
  createdAt: string;
}

function ReportItem({ username, userId, createdAt }: Props) {
  return (
    <div className="flex items-center w-full px-5 py-3 h-10 border border-solid border-gray300 hover:border-primary rounded-xl mb-2 text-sm font-medium text-gray700 cursor-pointer">
      <div className="w-1/5 pr-3">{username}</div>
      <div className="flex items-center relative px-3 flex-1 border-l-2 border-gary400 h-4 left-[-0.75rem]">
        {userId}
      </div>
      <div className="w-24 pr-3">
        {createdAt.slice(0, 10).replaceAll("-", ".")}
      </div>
      <div className="flex w-28 text-gray500 cursor-pointer">
        <button className="flex items-center relative hover:font-bold px-3 border-l-2 border-gray400 h-4 left-[-0.75rem]">
          프로필
        </button>
        <button className="flex items-center text-[#f00] font-semibold relative pl-3 border-l-2 border-gray400 h-4 left-[-0.75rem]">
          삭제
        </button>
      </div>
    </div>
  );
}

export default memo(ReportItem);
