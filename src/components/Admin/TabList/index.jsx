import { useState } from "react";

function TabList({ tabList }) {
  const [current, setCurrent] = useState(0);
  console.log(tabList.length);

  const rounded = (index, maxIndex) => {
    if (index === 0) return "rounded-l-xl";
    if (index === maxIndex) return "rounded-r-xl";
  };

  return (
    <div className="flex justify-between w-full min-w-[32rem] my-12">
      {tabList.map((item, index) => (
        <button
          className={`flex justify-center whitespace-nowrap border border-primary w-full p-3 font-semibold text-lg ${rounded(index, tabList.length - 1)} ${index === current ? "bg-primary text-white" : "text-primary"}`}
          onClick={() => {
            setCurrent(index);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default TabList;
