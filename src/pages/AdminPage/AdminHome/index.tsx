import { memo } from "react";
import HomeBodyForm from "./HomeBodyForm";

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

function AdminHome({ menuList }: Props) {
  return (
    <div>
      {menuList.map((item) => (
        <HomeBodyForm key={item.id} {...item} />
      ))}
    </div>
  );
}

export default memo(AdminHome);
