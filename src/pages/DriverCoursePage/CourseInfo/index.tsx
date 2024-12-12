import { memo, ReactNode } from "react";

interface Props {
  title: string;
  content: string | ReactNode;
}

function CourseInfo({ title, content }: Props) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <div className="text-lg text-black font-bold">{title}</div>
      <div className="text-sm text-darkgray font-medium">{content}</div>
    </div>
  );
}

export default memo(CourseInfo);
