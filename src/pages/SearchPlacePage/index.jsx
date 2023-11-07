import { useParams } from "react-router-dom";
import PlaceMap from "../../components/PlaceMap";

function SearchPlacePage() {
  const { keyword } = useParams();

  return (
    <div className="px-2 md:px-5 mb-24">
      <div className="text-2xl pt-8 py-4 text-black">
        가고 싶은 여행지를 찾아요
      </div>
      <PlaceMap search={true} newPlace={true} keyword={keyword} detail={true} />
    </div>
  );
}

export default SearchPlacePage;
