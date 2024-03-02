import { useSelector } from "react-redux";

function RegionFilter({ setShowRegionModal }) {
  const region = useSelector((state) => state.partyFilter.region);

  return (
    <button
      className="w-full h-full px-8 py-6 flex flex-col justify-between rounded-l-3xl border-r border-gray300"
      onClick={() => setShowRegionModal(true)}
    >
      <p className="text-base leading-5 text-gray700 font-medium">목적지</p>
      <p
        className={`text-2xl leading-7 text-gray400 font-bold  ${
          region === "모든 지역" ? "text-gray400" : "text-gray800"
        }`}
      >
        {region}
      </p>
    </button>
  );
}

export default RegionFilter;
