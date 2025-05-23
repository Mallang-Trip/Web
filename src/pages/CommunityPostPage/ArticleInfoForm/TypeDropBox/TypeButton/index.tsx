import { memo } from "react";
import clsx from "clsx";

interface Props {
  typeName: string;
  selectedType: string;
  selectHandler: (item: string) => void;
}

function TypeButton({ typeName, selectedType, selectHandler }: Props) {
  return (
    <button
      className={clsx(
        "w-full h-[50px] flex justify-between items-center py-4 px-5 hover:bg-skyblue",
        selectedType === typeName ? "bg-skyblue" : "bg-white"
      )}
      onClick={() => selectHandler(typeName)}
    >
      <span className="text-sm text-black">{typeName}</span>
    </button>
  );
}

export default memo(TypeButton);
