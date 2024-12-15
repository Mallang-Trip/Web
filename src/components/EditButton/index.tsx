import { memo } from "react";
import clsx from "clsx";
import pencil from "../../assets/svg/pencil.svg";

interface Props {
  title: string;
  className?: string;
  onClick: () => void;
}

function EditButton({ title, className, onClick }: Props) {
  return (
    <button
      className={clsx(
        "flex justify-between items-center gap-2 px-4 py-3 bg-skyblue rounded-xl border border-primary focus:outline-none",
        className
      )}
      onClick={() => onClick()}
    >
      <img src={pencil} alt={title} />
      <span className="text-sm text-primary whitespace-nowrap">{title}</span>
    </button>
  );
}

export default memo(EditButton);
