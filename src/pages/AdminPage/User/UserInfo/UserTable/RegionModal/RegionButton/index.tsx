import { Dispatch, memo, SetStateAction } from "react";
import regionCheck from "../../../../../../../assets/svg/region-check.svg";

interface Props {
  image: string;
  name: string;
  selectedRegion: string[];
  setSelectedRegion: Dispatch<SetStateAction<string[]>>;
}

function RegionButton({
  image,
  name,
  selectedRegion,
  setSelectedRegion,
}: Props) {
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => {
        if (selectedRegion.indexOf(name) > -1) {
          const newRegions = selectedRegion.filter((item) => item !== name);
          setSelectedRegion(newRegions);
        } else {
          setSelectedRegion([...selectedRegion, name]);
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
      {selectedRegion.indexOf(name) > -1 && (
        <div className="w-full h-48 absolute top-0 left-0 flex justify-center items-center rounded-xl bg-black bg-opacity-70">
          <img src={regionCheck} />
        </div>
      )}
    </div>
  );
}

export default memo(RegionButton);
