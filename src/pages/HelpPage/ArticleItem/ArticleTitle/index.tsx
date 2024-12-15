import { memo } from "react";

interface Props {
  title: string;
}

function ArticleTitle({ title }: Props) {
  return (
    <div className="w-full px-6 py-4 text-sm text-black font-bold bg-skyblue border-t-2 border-b border-mediumgray">
      {title}
    </div>
  );
}

export default memo(ArticleTitle);
