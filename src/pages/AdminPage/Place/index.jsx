import { useEffect, useState } from "react";
import { getAllMarkers, getSearchInfo } from "../../../api/destination";
import ConfirmModal from "../../../components/ConfirmModal";
import PlaceTab from "./PlaceTab";
import PlaceMap from "./PlaceMap";
import SearchBar from "./SearchBar";
import NewPlaceModal from "./NewPlaceModal";
import DestinationModal from "./DestinationModal";

function Place() {
  const [placeType, setPlaceType] = useState(0);
  const [placeData, setPlaceData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [destinationId, setDestinationId] = useState(-1);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNewPlaceModal, setShowNewPlaceModal] = useState(false);

  const submitHandler = async (e) => {
    if (e) e.preventDefault();

    try {
      const result = await getSearchInfo(keyword);

      if (result.payload.length === 0) {
        setErrorMessage("검색 결과가 없습니다.");
        setShowErrorModal(true);
      } else setPlaceData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllMarkersFunc = async () => {
    try {
      const result = await getAllMarkers();
      setPlaceData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllMarkersFunc();
  }, []);

  return (
    <div className="text-base font-medium">
      <PlaceTab placeType={placeType} setPlaceType={setPlaceType} />
      <SearchBar
        submitHandler={submitHandler}
        keyword={keyword}
        setKeyword={setKeyword}
        setShowNewPlaceModal={setShowNewPlaceModal}
      />
      <PlaceMap
        placeData={placeData}
        setDestinationId={setDestinationId}
        setShowDestinationModal={setShowDestinationModal}
      />
      <DestinationModal
        showModal={showDestinationModal}
        setShowModal={setShowDestinationModal}
        destinationId={destinationId}
      />
      <NewPlaceModal
        showModal={showNewPlaceModal}
        setShowModal={setShowNewPlaceModal}
        placeData={placeData}
        searchKeyword={keyword}
        setDestinationId={setDestinationId}
        setShowDestinationModal={setShowDestinationModal}
      />
      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message={errorMessage}
      />
    </div>
  );
}

export default Place;
