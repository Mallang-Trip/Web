function TableHead() {
  const columns = ["날짜", "파티명", "수입 금액(원)", ""];

  const setWidth = (index) => {
    if (index === 1) return "flex-1";
    else if (index === columns.length - 1) return "w-48";
    else return "w-[20%]";
  };

  return (
    <div className="flex items-center w-full px-5 py-3 justify-center bg-[#EAF4FF] rounded-xl mb-2 text-sm text-[#313033]">
      {columns.map((item, index) => (
        <div key={index} className={setWidth(index)}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default TableHead;
