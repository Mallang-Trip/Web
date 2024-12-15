import { Dispatch, memo, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import partyFilterRegion from "../../../../../assets/svg/party_filter_region.svg";
import clsx from "clsx";

interface Props {
  setShowRegionModal: Dispatch<SetStateAction<boolean>>;
}

function RegionMobileFilter({ setShowRegionModal }: Props) {
  const region = useSelector((state: RootState) => state.partyFilter.region);

  return (
    <button
      className="w-full h-12 flex gap-4 items-center px-4 text-sm font-bold bg-lightgray rounded-lg"
      onClick={() => setShowRegionModal(true)}
    >
      <img src={partyFilterRegion} alt="지역" />
      <span
        className={clsx(
          region === "모든 지역" ? "text-textgray" : "text-boldgray"
        )}
      >
        {region === "모든 지역" ? "목적지" : region}
      </span>
    </button>
  );
}

export default memo(RegionMobileFilter);
