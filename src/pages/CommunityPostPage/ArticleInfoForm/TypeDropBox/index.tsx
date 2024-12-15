import { Dispatch, memo, SetStateAction, useCallback } from "react";
import TypeButton from "./TypeButton";
import info from "../../../../assets/svg/more-info-black.svg";
import clsx from "clsx";

interface Props {
  showDropBox: boolean;
  setShowDropBox: Dispatch<SetStateAction<boolean>>;
  selectedType: string;
  setSelectedType: Dispatch<SetStateAction<string>>;
}

function TypeDropBox({
  showDropBox,
  setShowDropBox,
  selectedType,
  setSelectedType,
}: Props) {
  const selectHandler = useCallback((item: string) => {
    setShowDropBox(false);
    setTimeout(() => setSelectedType(item), 300);
  }, []);

  return (
    <div className="w-[200px] h-[50px] relative">
      <div
        className={clsx(
          "absolute top-0 left-0 z-10 w-[200px] border border-mediumgray rounded-lg bg-white overflow-hidden transition-all duration-500",
          showDropBox ? "max-h-[1000px]" : "max-h-[50px]"
        )}
      >
        <button
          className="w-full h-[50px] flex justify-between items-center py-4 px-5"
          onClick={() => setShowDropBox(!showDropBox)}
        >
          <span className="text-sm text-black">{selectedType}</span>
          <img
            src={info}
            alt="select_box"
            className={clsx(
              "w-2.5 h-2.5 transition-all duration-500",
              showDropBox ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
        <TypeButton
          typeName="자유게시판"
          selectedType={selectedType}
          selectHandler={selectHandler}
        />
        <TypeButton
          typeName="동행구해요"
          selectedType={selectedType}
          selectHandler={selectHandler}
        />
        <TypeButton
          typeName="피드백"
          selectedType={selectedType}
          selectHandler={selectHandler}
        />
      </div>
    </div>
  );
}

export default memo(TypeDropBox);
