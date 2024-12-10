import { memo } from "react";
import { NotiMailData } from "..";
import NotiMailItem from "./NotiMailsItem";

interface Props {
  current: number;
  data: NotiMailData[];
}

function TableBody({ current, data }: Props) {
  if (data.length === 0)
    return <div className="mt-20 text-center">목록이 비어있습니다.</div>;
  return (
    <div>
      {data.map((item) => (
        <NotiMailItem key={item.contentId} current={current} {...item} />
      ))}
    </div>
  );
}

export default memo(TableBody);
