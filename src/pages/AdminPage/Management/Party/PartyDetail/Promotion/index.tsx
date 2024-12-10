import { memo } from "react";
import clsx from "clsx";

interface Props {
  promotion: boolean;
}

function Promotion({ promotion }: Props) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">프로모션 코드 사용</p>
      <p
        className={clsx("text-sm font-medium", {
          "text-primary": promotion,
          "text-darkgray": !promotion,
        })}
      >
        {promotion ? "O" : "X"}
      </p>
    </div>
  );
}

export default memo(Promotion);
