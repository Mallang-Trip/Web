import { memo } from "react";

interface Props {
  content: string;
}

function InfoBubble({ content }: Props) {
  return (
    <div className="w-full my-4 text-xs text-boldgray text-center">
      {content}
    </div>
  );
}

export default memo(InfoBubble);
