import regionCheck from "../../../../../../../assets/svg/region-check.svg";

function RegionButton({ image, name, selectedRegion, setSelectedRegion }) {
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => {
        if (selectedRegion.includes(name)) {
          const newRegions = selectedRegion.filter((item) => item !== name);
          setSelectedRegion(newRegions);
        } else {
          setSelectedRegion({ ...selectedRegion, region: name });
        }
      }}
    >
      <img
        className="w-full h-48 object-cover object-center overflow-hidden rounded-xl"
        src={image}
        alt={name}
      />
      <div className="w-full mt-2.5 text-base text-boldgray font-medium text-center">
        {name}
      </div>
      {selectedRegion.includes(name) && (
        <div className="w-full h-48 absolute top-0 left-0 flex justify-center items-center rounded-xl bg-black bg-opacity-70">
          <img src={regionCheck} />
        </div>
      )}
    </div>
  );
}

export default RegionButton;
