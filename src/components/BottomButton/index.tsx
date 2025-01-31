import { memo } from "react";
import clsx from "clsx";

interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

function BottomButton({ text, onClick, disabled = false }: Props) {
  return (
    <div className="w-full block md:hidden fixed left-0 bottom-0 z-50">
      <div className="w-full h-8 bg-gradient-to-t from-white to-white/0"></div>
      <div className="w-full px-5 py-5 bg-white">
        <button
          className={clsx(
            "w-full h-12 text-sm text-bold rounded-lg",
            disabled ? "bg-[#EEEEEE] text-[#999999]" : "bg-primary text-white"
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      </div>
    </div>
  );
}

export default memo(BottomButton);
