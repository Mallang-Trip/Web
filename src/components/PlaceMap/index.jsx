import SearchBox from "./SearchBox";
import MapBox from "./MapBox";

function PlaceSearchPage() {
  return (
    <div>
      <div className="text-2xl pt-14 pb-3">가고 싶은 여행지를 찾아요</div>
      <div className="w-full relative">
        <MapBox />
        <SearchBox />
      </div>
    </div>
  );
}

export default PlaceSearchPage;
