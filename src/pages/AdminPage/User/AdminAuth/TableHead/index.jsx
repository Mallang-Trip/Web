function TableHead() {
  const columns = ["관리자", "아이디", "가입날짜", "프로필"];

  const setWidth = (index) => {
    if (index === 0) return "w-1/5";
    else if (index === 1) return "flex-1";
    else if (index === 2) return "w-24";
    else return "w-28";
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
