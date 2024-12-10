import { memo, useCallback, useMemo } from "react";

function TableHead() {
  const columns = useMemo(() => ["날짜", "파티명", "수입 금액(원)", ""], []);

  const setWidth = useCallback(
    (index: number) => {
      if (index === 1) return "flex-1";
      else if (index === columns.length - 1) return "w-48";
      else return "w-[20%]";
    },
    [columns]
  );

  return (
    <div className="flex items-center w-full px-5 py-3 justify-center bg-skyblue rounded-xl mb-2 text-sm text-gray800">
      {columns.map((item, index) => (
        <div key={index} className={setWidth(index)}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default memo(TableHead);
