import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchInfo } from "../../api/destination";
import SearchBox from "./SearchBox";
import MapBox from "./MapBox";
import RoundBtn from "./RoundBtn";
import CheckModal from "../CheckModal";
import ConfirmModal from "../ConfirmModal";

function PlaceMap({ search, keyword, detail, courseData, setCourseData }) {
  const navigation = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [markerData, setMarkerData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [clickedData, setClickedData] = useState({});
  const [message, setMessage] = useState("");

  const addCourseHandler = () => {
    setShowAddModal(false);

    const exist = courseData.some(
      (item) => item.destinationId === clickedData.destinationId
    );

    if (exist) setMessage("이미 여행 일정에 있습니다.");
    else {
      setCourseData([...courseData, clickedData]);
      setMessage("여행 일정에 추가되었습니다.");
    }

    setShowModal(true);
  };

  const submitHandler = async (e, keyword) => {
    if (e) e.preventDefault();

    if (e && detail)
      navigation(`/search/place/${keyword || searchKeyword}`, {
        replace: true,
      });

    setClicked(false);
    try {
      const result = await getSearchInfo(keyword || searchKeyword);

      if (result.payload.length === 0) {
        setShowModal(true);
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
      {!detail && clicked && clickedData?.destinationId !== -1 && (
        <div className="absolute bottom-5 left-0 w-full flex flex-col gap-3 justify-center items-center">
          <RoundBtn
            name={`[${clickedData.name}] 상세보기`}
            onClick={() =>
              window.open(
                `/destination/detail/${clickedData.destinationId}`,
                "_blank"
              )
            }
          />
          <RoundBtn
            name={`여행 일정에 [${clickedData.name}] 추가하기`}
            onClick={() => setShowAddModal(true)}
          />
        </div>
      )}
      {detail && clicked && clickedData?.destinationId !== -1 && (
        <div className="absolute bottom-10 left-0 w-full flex justify-center items-center">
          <RoundBtn
            name={`[${clickedData.name}] 상세보기`}
            onClick={() =>
              navigation(`/destination/detail/${clickedData.destinationId}`)
            }
          />
        </div>
      )}

      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={message}
      />
      <CheckModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        message={
          <div>
            <span className="text-primary text-lg">[{clickedData.name}]</span>
            <br />
            <br />
            여행 일정에 추가하시겠습니까?
          </div>
        }
        noText="아니요"
        yesText="네"
        yesHandler={() => addCourseHandler()}
      />
    </div>
  );
}

export default PlaceMap;
