import { memo } from "react";
import { ImageBox } from "@/components";

interface Props {
  title: string;
  content: string;
  createdAt: string;
  images: string[];
}

function Notice({ title, content, createdAt, images }: Props) {
  return (
    <>
      <div className="w-full px-6 py-4 text-sm text-black font-bold bg-skyblue border-t-2 border-b border-mediumgray">
        {title}
      </div>
      <div className="w-full px-6 pb-10 border-b border-mediumgray">
        <p className="mt-4 text-xs text-darkgray font-medium">
          작성일 {createdAt.slice(0, 10).replaceAll("-", ".")}
        </p>
        <div className="w-full mt-10 mb-5">
          <ImageBox images={images} name={title} />
        </div>
        <p className="text-sm text-black font-medium whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </>
  );
}

export default memo(Notice);
