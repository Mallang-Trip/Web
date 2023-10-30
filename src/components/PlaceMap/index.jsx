import SearchBox from "./SearchBox";
import MapBox from "./MapBox";

function PlaceMap() {
  return (
    <div className="relative">
      <div className="relative">
        <MapBox />
        <SearchBox />
      </div>
    </div>
  );
}

export default PlaceMap;
