import { memo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function PolicyContainer({ children }: Props) {
  return <div className="px-4">{children}</div>;
}

export default memo(PolicyContainer);
