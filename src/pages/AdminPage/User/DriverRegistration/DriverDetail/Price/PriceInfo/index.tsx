import { memo } from "react";

interface Props {
  content: string;
}

function PriceInfo({ content }: Props) {
  return (
    <div className="py-4 px-6 rounded-xl whitespace-nowrap text-sm text-center text-darkgray bg-lightgray">
      {content}
    </div>
  );
}

export default memo(PriceInfo);
