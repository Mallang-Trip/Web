import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchInfo } from "../../api/destination";
import SearchBox from "./SearchBox";
import MapBox from "./MapBox";
import RoundBtn from "./RoundBtn";
import CheckModal from "../CheckModal";
import ConfirmModal from "../ConfirmModal";

function PlaceMap({ search, newPlace, keyword, detail }) {
  const navigation = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [markerData, setMarkerData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [clickedData, setClickedData] = useState({});

  const submitHandler = async (e, keyword) => {
    if (e) e.preventDefault();

    setClicked(false);
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
          setClickedData={setClickedData}
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
        <div className="absolute top-16 md:top-5 left-1/2 md:left-2/3 -translate-x-1/2 md:translate-x-1/4">
          <RoundBtn
            name={"새로운 장소 추가"}
            onClick={() => setShowAddModal(true)}
          />
        </div>
      )}
      {newPlace && clicked && !detail && (
        <div className="absolute bottom-10 left-0 w-full flex justify-center items-center">
          <RoundBtn
            name={"여행 일정에 추가하기"}
            onClick={() => console.log("여행 일정에 추가")}
          />
        </div>
      )}
      {detail && clicked && (
        <div className="absolute bottom-10 left-0 w-full flex justify-center items-center">
          <RoundBtn
            name={"여행지 상세보기"}
            onClick={() =>
              navigation(`/destination/detail/${clickedData.destinationId}`)
            }
          />
        </div>
      )}

      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"검색 결과가 없습니다."}
      />
      <CheckModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        message={"새로운 장소를 추가하시겠습니까?"}
        noText="아니요"
        yesText="네"
        yesHandler={() => console.log("새로운 장소 추가")}
      />
    </div>
  );
}

export default PlaceMap;
