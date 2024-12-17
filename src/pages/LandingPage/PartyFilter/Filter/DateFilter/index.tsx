import { Dispatch, memo, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import clsx from "clsx";

interface Props {
  setShowDateModal: Dispatch<SetStateAction<boolean>>;
}

function DateFilter({ setShowDateModal }: Props) {
  const nowDate = useSelector((state: RootState) => state.partyFilter.nowDate);

  return (
    <button
      className="w-full h-full px-8 py-6 flex flex-col justify-between rounded-l-3xl border-r border-gray300"
      onClick={() => setShowDateModal(true)}
    >
      <p className="text-base leading-5 text-gray700 font-medium">
        가능한 일정
      </p>
      <p
        className={clsx(
          "text-2xl leading-7 font-bold",
          nowDate.length ? "text-gray800" : "text-gray400"
        )}
      >
        {nowDate.length
          ? `${String(nowDate[0].getMonth() + 1).padStart(2, "0")}.${String(
              nowDate[0].getDate()
            ).padStart(2, "0")} ~ ${String(nowDate[1].getMonth() + 1).padStart(
              2,
              "0"
            )}.${String(nowDate[1].getDate()).padStart(2, "0")}`
          : "모든 날짜"}
      </p>
    </button>
  );
}

export default memo(DateFilter);
