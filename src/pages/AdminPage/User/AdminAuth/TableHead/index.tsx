import { memo, useCallback, useMemo } from "react";

function TableHead() {
  const columns = useMemo(() => ["관리자", "아이디", "가입날짜", "프로필"], []);

  const setWidth = useCallback((index: number) => {
    if (index === 0) return "w-1/5";
    else if (index === 1) return "flex-1";
    else if (index === 2) return "w-24";
    else return "w-28";
  }, []);

  return (
    <div className="flex items-center w-full px-5 py-3 justify-center bg-skyblue rounded-xl mb-2 text-sm text-gray800 font-semibold">
      {columns.map((item, index) => (
        <div key={index} className={setWidth(index)}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default memo(TableHead);
