import { useState } from "react";
import ButtonItem from "./ButtonItem";

function AdminSideBar({ buttonList, location }) {
  const [current, setCurrent] = useState(location);

  const changeCurrent = (current) => {
    setCurrent(current);
  };

  return (
    <div className="fixed top-0 left-0 w-60 h-full overflow-y-auto scrollbar-hide py-28 bg-[#F8FBFF]">
      {buttonList.map((item, index) => (
        <ButtonItem
          key={index}
          current={current}
          changeCurrent={changeCurrent}
          {...item}
        />
      ))}
    </div>
  );
}

export default AdminSideBar;
