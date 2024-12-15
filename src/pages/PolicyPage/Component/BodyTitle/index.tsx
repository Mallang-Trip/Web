import { memo } from "react";

interface Props {
  title: string;
}

function BodyTitle({ title }: Props) {
  return <div className="text-2xl text-black font-bold">{title}</div>;
}

export default memo(BodyTitle);
