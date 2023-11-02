import SearchBox from "./SearchBox";
import MapBox from "./MapBox";
import RoundBtn from "./RoundBtn";
import { useState } from "react";
import { getSearchInfo } from "../../api/destination";
import ConfirmModal from "../ConfirmModal";

function PlaceMap({ search, newPlace }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [markerData, setMarkerData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const resukt = await getSearchInfo(searchKeyword);

      if (resukt.payload.length === 0) setShowModal(true);
      else setMarkerData(resukt.payload);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <MapBox markerData={markerData} setMarkerData={setMarkerData} />
        {search && (
          <SearchBox
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            submitHandler={submitHandler}
          />
        )}
      </div>
      {newPlace && (
        <div className="absolute top-5 right-1/3">
          <RoundBtn name={"새로운 장소 추가"} />
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
