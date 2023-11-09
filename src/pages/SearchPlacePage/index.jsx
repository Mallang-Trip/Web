import { useParams } from "react-router-dom";
import PlaceMap from "../../components/PlaceMap";
import RoundBtn from "../../components/PlaceMap/RoundBtn";
import ZimBtn from "../../components/PlaceMap/ZimBtn";
import SearchBox from "../../components/PlaceMap/SearchBox";
function SearchPlacePage() {
  const { keyword } = useParams();

  return (
    <div>
      <div className="text-2xl pt-14 pb-3">가고 싶은 여행지를 찾아요</div>
      <div className="relative">
        <PlaceMap />
        <div>
          <SearchBox />
        </div>
        <div className="absolute top-5 right-1/3 ">
          <RoundBtn name={"새로운 장소 추가"} />
        </div>
        <div className="absolute bottom-10 left-1/3 ">
          <RoundBtn name={"여행지 상세보기"} />
        </div>
        <div className="absolute bottom-2 right-1/4 ">
          <ZimBtn />
        </div>
      </div>
      <PlaceMap search={true} newPlace={true} keyword={keyword} detail={true} />
    </div>
  );
}

export default SearchPlacePage;
