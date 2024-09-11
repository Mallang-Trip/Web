import { memo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function PageContainer({ children }: Props) {
  return (
    <div className="max-w-screen-xl min-h-[800px] mx-auto px-2 md:px-5 mb-24">
      {children}
    </div>
  );
}

export default memo(PageContainer);
