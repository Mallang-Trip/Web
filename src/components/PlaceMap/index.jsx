import SearchBox from "./SearchBox";
import MapBox from "./MapBox";
import RoundBtn from "./RoundBtn";
import { useEffect, useState } from "react";
import { getSearchInfo } from "../../api/destination";
import ConfirmModal from "../ConfirmModal";

function PlaceMap({ search, newPlace, keyword }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [markerData, setMarkerData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clicked, setClicked] = useState(false);

  const submitHandler = async (e, keyword) => {
    if (e) e.preventDefault();

    try {
      const result = await getSearchInfo(keyword || searchKeyword);

      if (result.payload.length === 0) setShowModal(true);
      else setMarkerData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!keyword || keyword === "null") return;

    setSearchKeyword(keyword);
    submitHandler(undefined, keyword);
  }, [keyword]);

  return (
    <div className="relative">
      <div className="relative">
        <MapBox
          markerData={markerData}
          setMarkerData={setMarkerData}
          clicked={clicked}
          setClicked={setClicked}
        />
        {search && (
          <SearchBox
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            submitHandler={submitHandler}
          />
        )}
      </div>
      {newPlace && (
        <div className="absolute md:top-5 md:right-1/3 top-16 right-2/3">
          <RoundBtn name={"새로운 장소 추가"} />
        </div>
      )}
      {newPlace && clicked && (
        <div className="absolute bottom-20 left-2/3 w-full">
          <RoundBtn name={"여행 일정에 추가하기"} />
        </div>
      )}

      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"검색 결과가 없습니다."}
      />
    </div>
  );
}

export default PlaceMap;
