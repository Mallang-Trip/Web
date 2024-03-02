import regionCheck from "../../../../../assets/svg/region-check.svg";

function RegionButton({ image, name, selectedRegion, setSelectedRegion }) {
  return (
    <div
      className="relative w-48 cursor-pointer"
      onClick={() => setSelectedRegion(name)}
    >
      <img
        className="w-48 h-48 object-cover object-center overflow-hidden rounded-full"
        src={image}
        alt={name}
      />
      <div className="w-full mt-2.5 text-base text-boldgray font-medium text-center">
        {name}
      </div>
      {name === selectedRegion && (
        <div className="w-48 h-48 absolute top-0 left-0 flex justify-center items-center rounded-full bg-black bg-opacity-70">
          <img src={regionCheck} />
        </div>
      )}
    </div>
  );
}

export default RegionButton;
