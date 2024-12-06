import { memo, useEffect, useState } from "react";
import clsx from "clsx";

interface Props {
  tabList: { name: string; id: string }[];
  changeTab: (current: number) => void;
  index: number | undefined;
}

function TabList({ tabList, changeTab, index }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!index) return;
    setCurrent(index);
  }, [index]);

  return (
    <div className="flex justify-between w-full min-w-[32rem] my-12">
      {tabList.map((item, index) => (
        <button
          key={index}
          className={clsx(
            "flex justify-center whitespace-nowrap border border-primary w-full p-3 font-semibold text-lg",
            {
              "rounded-l-xl": index === 0,
              "rounded-r-xl": index === tabList.length - 1,
            },
            {
              "bg-primary text-white": index === current,
              "text-primary": index !== current,
            }
          )}
          onClick={() => {
            setCurrent(index);
            changeTab(index);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default memo(TabList);
