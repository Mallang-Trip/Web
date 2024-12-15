import { Dispatch, memo, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";

interface Props {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}

function Tab({ type, setType }: Props) {
  const { id } = useParams();

  if (id !== "list") return null;
  return (
    <div className="w-full flex my-9">
      <button
        className={clsx(
          "w-full h-12 rounded-l-lg",
          type === "ANNOUNCEMENT"
            ? "bg-primary text-white"
            : "bg-white text-primary border border-primary"
        )}
        onClick={() => setType("ANNOUNCEMENT")}
      >
        공지사항
      </button>
      <button
        className={clsx(
          "w-full h-12 rounded-r-lg",
          type === "FAQ"
            ? "bg-primary text-white"
            : "bg-white text-primary border border-primary"
        )}
        onClick={() => setType("FAQ")}
      >
        FAQ
      </button>
    </div>
  );
}

export default memo(Tab);
