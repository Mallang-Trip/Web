import { memo, useCallback, useMemo } from "react";
import clsx from "clsx";

interface Props {
  current: number;
}

function TableHead({ current }: Props) {
  const cols = useMemo(
    () => [
      ["피신고자 닉네임", "아이디", "신고날짜", "프로필"],
      ["닉네임", "아이디", "제재 사유", "제재 여부"],
    ],
    []
  );

  const setWidth = useCallback(
    (index: number) => {
      if (current === 0) {
        if (index === 0) return "w-1/5";
        else if (index === 1) return "flex-1";
        else if (index === 2) return "w-[12.5%]";
        else return "w-16 flex justify-end";
      } else {
        if (index === 0) return "w-1/5";
        else if (index === 1) return "w-1/5";
        else if (index === 2) return "flex-1";
        else return "w-16";
      }
    },
    [current]
  );

  return (
    <div className="flex items-center w-full px-5 py-3 justify-center bg-skyblue rounded-xl mb-2 text-sm text-gray800">
      {cols[current].map((item, index) => (
        <div key={item} className={clsx("font-semibold", setWidth(index))}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default memo(TableHead);
