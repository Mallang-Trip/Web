import { FormEvent, memo, useCallback, useEffect, useState } from "react";
import { getAllMarkers, getSearchInfo } from "@/api/destination";
import { Destination } from "@/types";
import { ConfirmModal } from "@/components";
import PlaceTab from "./PlaceTab";
import PlaceMap from "./PlaceMap";
import PlaceList from "./PlaceList";
import SearchBar from "./SearchBar";
import NewPlaceModal from "./NewPlaceModal";
import DestinationModal from "./DestinationModal";

function Place() {
  const [placeType, setPlaceType] = useState(0);
  const [placeData, setPlaceData] = useState<Destination[]>([]);
  const [keyword, setKeyword] = useState("");
  const [destinationId, setDestinationId] = useState(-1);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showNewPlaceModal, setShowNewPlaceModal] = useState(false);
  const [blockSearch, setBlockSearch] = useState(false);

  const submitHandler = useCallback(
    async (event?: FormEvent<HTMLFormElement>) => {
      if (event) event.preventDefault();

      try {
        const result = await getSearchInfo(keyword);

        if (result.payload.length === 0) {
          setErrorMessage("검색 결과가 없습니다.");
          setShowErrorModal(true);
          setBlockSearch(true);
        } else setPlaceData(result.payload);
      } catch (e) {
        console.log(e);
      }
    },
    [keyword]
  );

  const getAllMarkersFunc = useCallback(async () => {
    try {
      const result = await getAllMarkers();
      setPlaceData(result.payload);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    setBlockSearch(false);
  }, [keyword]);

  useEffect(() => {
    if (blockSearch) return;
    if (keyword) submitHandler();
    else getAllMarkersFunc();
  }, [placeType]);

  return (
    <div className="text-base font-medium">
      <PlaceTab placeType={placeType} setPlaceType={setPlaceType} />
      <SearchBar
        submitHandler={submitHandler}
        keyword={keyword}
        setKeyword={setKeyword}
        setShowNewPlaceModal={setShowNewPlaceModal}
        getAllMarkersFunc={getAllMarkersFunc}
      />
      {placeType === 0 ? (
        <PlaceMap
          placeData={placeData}
          setDestinationId={setDestinationId}
          setShowDestinationModal={setShowDestinationModal}
          keyword={keyword}
        />
      ) : (
        <PlaceList
          placeData={placeData}
          setDestinationId={setDestinationId}
          setShowDestinationModal={setShowDestinationModal}
        />
      )}
      <DestinationModal
        showModal={showDestinationModal}
        setShowModal={setShowDestinationModal}
        destinationId={destinationId}
        placeData={placeData}
        setPlaceData={setPlaceData}
      />
      <NewPlaceModal
        showModal={showNewPlaceModal}
        setShowModal={setShowNewPlaceModal}
        placeData={placeData}
        searchKeyword={keyword}
      />
      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message={errorMessage}
      />
    </div>
  );
}

export default memo(Place);
