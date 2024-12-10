import { memo, useCallback, useEffect, useState } from "react";

interface Props {
  current: number;
}

function TableHead({ current }: Props) {
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    if (current === 0) setColumns(["회원 유형", "약관 유형", "약관 내용", ""]);
    else setColumns(["받은 이", "메일 제목", "발송 날짜", ""]);
  }, [current]);

  const setWidth = useCallback(
    (index: number) => {
      if (current === 0) {
        if (index === 2) return "flex-1";
        else if (index === columns.length - 1) return "w-12";
        else return "w-[20%]";
      } else {
        if (index === 1) return "flex-1";
        else if (index === columns.length - 1) return "w-12";
        else return "w-[20%]";
      }
    },
    [columns, current]
  );

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
