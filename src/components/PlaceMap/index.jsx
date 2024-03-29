import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchInfo } from "../../api/destination";
import SearchBox from "./SearchBox";
import MapBox from "./MapBox";
import ConfirmModal from "../ConfirmModal";
import DestinationModal from "./DestinationModal";

function PlaceMap({ search, keyword, searchPage, courseData, setCourseData }) {
  const navigation = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [markerData, setMarkerData] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [clickedData, setClickedData] = useState({});
  const [message, setMessage] = useState("");

  const submitHandler = async (e, keyword) => {
    if (e) e.preventDefault();

    if (e && searchPage)
      navigation(`/search/place/${keyword || searchKeyword}`, {
        replace: true,
      });

    setClicked(false);
    try {
      const result = await getSearchInfo(keyword || searchKeyword);

      if (result.payload.length === 0) {
        setShowMessageModal(true);
        setMessage("검색 결과가 없습니다.");
      } else setMarkerData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!keyword || keyword === "null") return;

    setSearchKeyword(keyword);
    submitHandler(undefined, keyword);
  }, [keyword]);

  useEffect(() => {
    if (!courseData || markerData.length) return;
    setMarkerData(courseData);
  }, [courseData]);

  return (
    <div className="relative">
      <div className="relative">
        <MapBox
          markerData={markerData}
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

      <ConfirmModal
        showModal={showMessageModal}
        setShowModal={setShowMessageModal}
        message={message}
      />
      <DestinationModal
        showModal={clicked}
        setShowModal={setClicked}
        courseData={courseData}
        setCourseData={setCourseData}
        clickedData={clickedData}
        searchPage={searchPage}
      />
    </div>
  );
}

export default PlaceMap;
