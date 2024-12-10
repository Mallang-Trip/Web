import { memo } from "react";
import ButtonItem from "./ButtonItem";

interface Props {
  menuList: {
    id: string;
    name: string;
    child?: {
      id: string;
      name: string;
    }[];
  }[];
}

function AdminSideBar({ menuList }: Props) {
  return (
    <div className="fixed top-0 left-0 hidden md:block w-60 h-full overflow-y-auto scrollbar-hide py-28 bg-[#F8FBFF]">
      {menuList.map((item) => (
        <ButtonItem key={item.id} {...item} />
      ))}
    </div>
  );
}

export default memo(AdminSideBar);
