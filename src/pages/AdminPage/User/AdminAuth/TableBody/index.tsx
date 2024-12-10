import { memo } from "react";
import AdminAuthItem from "./AdminAuthItem";

interface Props {
  adminUserData: {
    username: string;
    userId: number;
    createdAt: string;
  }[];
}

function TableBody({ adminUserData }: Props) {
  if (adminUserData.length === 0)
    return <div className="mt-20 text-center">목록이 비어있습니다.</div>;
  return (
    <div>
      {adminUserData.map((item) => (
        <AdminAuthItem key={item.userId} {...item} />
      ))}
    </div>
  );
}

export default memo(TableBody);
