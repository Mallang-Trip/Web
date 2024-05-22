import { useEffect, useState } from "react";

function TableHead({ current }) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (current === 0) setColumns(["회원 유형", "약관 유형", "약관 내용", ""]);
    else setColumns(["받은 이", "메일 제목", "발송 날짜", ""]);
  }, [current]);

  const setWidth = (index) => {
    if (current === 0) {
      if (index === 2) return "flex-1";
      else if (index === columns.length - 1) return "w-12";
      else return "w-[20%]";
    } else {
      if (index === 1) return "flex-1";
      else if (index === columns.length - 1) return "w-12";
      else return "w-[20%]";
    }
  };

  return (
    <div className="flex items-center w-full px-5 py-3 justify-center bg-[#EAF4FF] rounded-xl mb-2 text-sm text-[#313033] font-semibold">
      {columns.map((item, index) => (
        <div key={index} className={setWidth(index)}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default TableHead;
