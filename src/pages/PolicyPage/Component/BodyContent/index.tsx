import { memo, ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

function BodyContent({ title, children }: Props) {
  return (
    <div className="my-[70px]">
      <div className="text-xl text-black font-bold">{title}</div>
      <div className="mt-5 text-base text-boldgray font-medium whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}

export default memo(BodyContent);
