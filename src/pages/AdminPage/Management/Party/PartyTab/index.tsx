import { Dispatch, memo, SetStateAction } from "react";
import clsx from "clsx";

interface Props {
  partyType: string;
  setPartyType: Dispatch<SetStateAction<string>>;
}

function PartyTab({ partyType, setPartyType }: Props) {
  return (
    <div className="w-full grid grid-cols-2 my-10 rounded-lg">
      <button
        className={clsx(
          "h-12 rounded-tl-lg border border-primary text-sm font-semibold",
          partyType === "before_reservation"
            ? "text-white bg-primary"
            : "text-primary bg-white"
        )}
        onClick={() => setPartyType("before_reservation")}
      >
        모집 중인 파티 관리
      </button>
      <button
        className={clsx(
          "h-12 rounded-tr-lg border-t border-r border-primary text-sm font-semibold",
          partyType === "after_reservation"
            ? "text-white bg-primary"
            : "text-primary bg-white"
        )}
        onClick={() => setPartyType("after_reservation")}
      >
        예약된 파티 관리
      </button>
      <button
        className={clsx(
          "h-12 rounded-bl-lg border-b border-l border-primary text-sm font-semibold",
          partyType === "finished"
            ? "text-white bg-primary"
            : "text-primary bg-white"
        )}
        onClick={() => setPartyType("finished")}
      >
        완료된 파티 관리
      </button>
      <button
        className={clsx(
          "h-12 rounded-br-lg border border-primary text-sm font-semibold",
          partyType === "canceled"
            ? "text-white bg-primary"
            : "text-primary bg-white"
        )}
        onClick={() => setPartyType("canceled")}
      >
        취소된 파티 관리
      </button>
    </div>
  );
}

export default memo(PartyTab);
