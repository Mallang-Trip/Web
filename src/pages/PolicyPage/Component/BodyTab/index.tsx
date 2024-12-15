import { memo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function BodyTab({ children }: Props) {
  return <div className="ml-7">{children}</div>;
}

export default memo(BodyTab);
