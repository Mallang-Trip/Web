import regionCheck from "../../../../../assets/svg/region-check.svg";

function RegionButton({
  regionImg,
  region,
  selectedRegion,
  setSelectedRegion,
}) {
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => setSelectedRegion(region)}
    >
      <img
        className="w-full h-48 object-cover object-center overflow-hidden rounded-xl"
        src={regionImg}
        alt={region}
      />
      <div className="w-full mt-2.5 text-base text-boldgray font-medium text-center">
        {region}
      </div>
      {region === selectedRegion && (
        <div className="w-full h-48 absolute top-0 left-0 flex justify-center items-center rounded-xl bg-black bg-opacity-70">
          <img src={regionCheck} />
        </div>
      )}
    </div>
  );
}

export default RegionButton;
