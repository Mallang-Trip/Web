import { Dispatch, memo, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import clsx from "clsx";

interface Props {
  setShowRegionModal: Dispatch<SetStateAction<boolean>>;
}

function RegionFilter({ setShowRegionModal }: Props) {
  const region = useSelector((state: RootState) => state.partyFilter.region);

  return (
    <button
      className="w-full h-full px-8 py-6 flex flex-col justify-between rounded-l-3xl border-r border-gray300"
      onClick={() => setShowRegionModal(true)}
    >
      <p className="text-base leading-5 text-gray700 font-medium">목적지</p>
      <p
        className={clsx(
          "text-2xl leading-7 text-gray400 font-bold",
          region === "모든 지역" ? "text-gray400" : "text-gray800"
        )}
      >
        {region}
      </p>
    </button>
  );
}

export default memo(RegionFilter);
