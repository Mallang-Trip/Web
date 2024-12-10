import { memo } from "react";

interface Props {
  count: number;
}

function WaitingCount({ count }: Props) {
  return (
    <p className="text-4xl text-primary font-bold mt-3 mb-10">{count}개</p>
  );
}

export default memo(WaitingCount);
