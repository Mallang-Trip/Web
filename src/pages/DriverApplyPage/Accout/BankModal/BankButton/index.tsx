import { Dispatch, memo, SetStateAction } from "react";
import clsx from "clsx";

interface Props {
  name: string;
  bank: string;
  setBank: Dispatch<SetStateAction<string>>;
}

function BankButton({ name, bank, setBank }: Props) {
  return (
    <button
      className={clsx(
        "h-12 text-sm rounded-lg text-center focus:outline-none",
        bank === name
          ? "text-primary bg-skyblue"
          : "text-darkgray bg-lightgray hover:bg-skyblue"
      )}
      onClick={() => setBank(name)}
    >
      {name}
    </button>
  );
}

export default memo(BankButton);
