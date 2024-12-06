import { memo } from "react";
import clsx from "clsx";

interface Props {
  name: string;
  onClick: () => void;
  type: "red" | "primary";
}

function Button({ name, onClick, type }: Props) {
  return (
    <button
      className={clsx("w-24 h-10 rounded-full border text-base", {
        "text-[#FF0000] border-[#FF0000] bg-[#FFEAEA]": type === "red",
        "text-primary border-primary bg-skyblue": type === "primary",
      })}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default memo(Button);
