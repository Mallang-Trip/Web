import { memo } from "react";

interface Props {
  title: string;
}

function HeadTitle({ title }: Props) {
  return <div className="text-2xl text-black font-bold mb-20">{title}</div>;
}

export default memo(HeadTitle);
