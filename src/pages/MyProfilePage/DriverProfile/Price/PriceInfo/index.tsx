import { Dispatch, memo, SetStateAction } from "react";
import clsx from "clsx";

interface Props {
  modifyMode: boolean;
  content: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function PriceInfo({ modifyMode, content, setShowModal }: Props) {
  return (
    <div
      className={clsx(
        "py-4 px-6 rounded-xl whitespace-nowrap text-sm text-center",
        modifyMode
          ? "text-primary bg-skyblue cursor-pointer"
          : "text-darkgray bg-lightgray"
      )}
      onClick={() => modifyMode && setShowModal(true)}
    >
      {content}
    </div>
  );
}

export default memo(PriceInfo);
