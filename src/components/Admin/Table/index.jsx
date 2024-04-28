function Table({ columns, data }) {
  return (
    <div className="flex flex-col w-full min-w-[32rem]">
      <div className="flex w-full px-5 py-3 items-center justify-center bg-[#EAF4FF] rounded-xl mb-2 text-sm text-[#313033]">
        {columns.map((item, index) => (
          <div key={index} className={index === 1 ? "flex-1" : "w-[25%]"}>
            {item}
          </div>
        ))}
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className="flex w-full px-5 py-3 h-10 border border-solid border-[#EFEFEF] rounded-xl mb-2 text-sm"
        >
          {item.map((it, id) => (
            <div
              key={id}
              className={`${id === 2 ? "text-primary" : "text-[#939094]"} ${id === 1 ? "flex-1 text-[#313033]" : "w-[25%]"} min-w-fit`}
            >
              {it}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;
