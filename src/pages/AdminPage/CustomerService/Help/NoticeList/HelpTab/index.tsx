import { Dispatch, memo, SetStateAction } from "react";
import clsx from "clsx";

interface Props {
  helpType: string;
  setHelpType: Dispatch<SetStateAction<string>>;
}

function HelpTab({ helpType, setHelpType }: Props) {
  return (
    <div className="w-full my-10 grid grid-cols-2 rounded-lg border border-primary">
      <button
        className={clsx(
          "h-12 rounded-l-lg border-r border-primary text-sm font-semibold",
          {
            "text-white bg-primary": helpType === "ANNOUNCEMENT",
            "text-primary bg-white": helpType !== "ANNOUNCEMENT",
          }
        )}
        onClick={() => setHelpType("ANNOUNCEMENT")}
      >
        공지사항
      </button>
      <button
        className={clsx("h-12 rounded-r-lg text-sm font-semibold", {
          "text-white bg-primary": helpType === "FAQ",
          "text-primary bg-white": helpType !== "FAQ",
        })}
        onClick={() => setHelpType("FAQ")}
      >
        FAQ
      </button>
    </div>
  );
}

export default memo(HelpTab);
