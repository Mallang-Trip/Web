import { memo, useMemo } from "react";
import clsx from "clsx";

interface Props {
  top: string;
  left: string;
}

function Ping({ top, left }: Props) {
  const position = useMemo(() => {
    const positionTop = top ? `top-${top}` : "top-0";
    const positionLeft = left ? `left-${left}` : "left-0";
    return `${positionTop} ${positionLeft}`;
  }, [top, left]);

  return (
    <span className={clsx("absolute translate-x-4", position)}>
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
      </span>
    </span>
  );
}

export default memo(Ping);
