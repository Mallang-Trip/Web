import { memo } from "react";

interface Props {
  title: string;
  content: string | string[];
}

function TextArea({ title, content }: Props) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">{title}</p>
      <p className="text-sm text-darkgray font-medium">
        {Array.isArray(content) ? content.join(" / ") : content}
      </p>
    </div>
  );
}

export default memo(TextArea);
