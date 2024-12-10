import { memo } from "react";
import clsx from "clsx";

interface Props {
  title: string;
  className?: string;
}

function Title({ title, className }: Props) {
  return (
    <p className={clsx("text-2xl text-black font-bold", className)}>{title}</p>
  );
}

export default memo(Title);
