import { memo } from "react";

function EmptyNotify() {
  return (
    <div className="w-full my-28 text-center text-black">
      받은 알림 목록이 비어있습니다.
    </div>
  );
}

export default memo(EmptyNotify);
