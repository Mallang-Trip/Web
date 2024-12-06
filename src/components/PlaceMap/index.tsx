import {
  Dispatch,
  FormEvent,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { getAllMarkers, getSearchInfo } from "../../api/destination";
import { Destination } from "../../types";
import SearchBox from "./SearchBox";
import MapBox from "./MapBox";
import NoDataModal from "./NoDataModal";
import DestinationModal from "./DestinationModal";
import NewPlaceModal from "./NewPlaceModal";

interface Props {
  search: boolean;
  keyword: string;
  searchPage: boolean;
  onlyAllPlace: boolean;
  courseData?: Destination[];
  setCourseData?: Dispatch<SetStateAction<Destination[]>>;
}

function PlaceMap({
  search,
  keyword,
  searchPage,
  onlyAllPlace,
  courseData,
  setCourseData,
}: Props) {
  const navigation = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [markerData, setMarkerData] = useState<Destination[]>([]);
  const [showNoDataModal, setShowNoDataModal] = useState(false);
  const [showNewPlaceModal, setShowNewPlaceModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [clickedData, setClickedData] = useState<Destination>();
  const [isAllMarker, setIsAllMarker] = useState(false);
  const [recentSearched, setRecentSearched] = useState([]);

  const submitHandler = useCallback(
    async (event: FormEvent<HTMLFormElement> | undefined, keyword?: string) => {
      if (event) event.preventDefault();

      if (event && searchPage) {
        navigation(`/search/place/${keyword || searchKeyword}`, {
          replace: true,
        });
      }

      setShowDestinationModal(false);
      try {
        const result = await getSearchInfo(keyword || searchKeyword);

        if (result.payload.length === 0) return setShowNoDataModal(true);
        setMarkerData(result.payload);
        setRecentSearched(result.payload);
        setIsAllMarker(false);
      } catch (e) {
        console.log(e);
      }
    },
    [searchKeyword, searchPage]
  );

  const getAllMarkersFunc = useCallback(async () => {
    try {
      const result = await getAllMarkers();
      setMarkerData(result.payload);
      setIsAllMarker(true);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (!keyword || keyword === "null") return;

    setSearchKeyword(keyword);
    submitHandler(undefined, keyword);
  }, [keyword]);

  useEffect(() => {
    if (courseData?.length && !onlyAllPlace) setMarkerData(courseData);
    else if (searchKeyword) return;
    else getAllMarkersFunc();
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <MapBox
          markerData={markerData}
          setShowDestinationModal={setShowDestinationModal}
          setClickedData={setClickedData}
          isAllMarker={isAllMarker}
          recentSearched={recentSearched}
        />
        {search && (
          <SearchBox
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            submitHandler={submitHandler}
            getAllMarkersFunc={getAllMarkersFunc}
            isAllMarker={isAllMarker}
          />
        )}
      </div>

      <NoDataModal
        showModal={showNoDataModal}
        setShowModal={setShowNoDataModal}
        searchPage={searchPage}
        setShowNewPlaceModal={setShowNewPlaceModal}
      />
      <NewPlaceModal
        showModal={showNewPlaceModal}
        setShowModal={setShowNewPlaceModal}
        markerData={markerData}
        searchKeyword={searchKeyword}
        courseData={courseData}
        setCourseData={setCourseData}
      />
      <DestinationModal
        showModal={showDestinationModal}
        setShowModal={setShowDestinationModal}
        courseData={courseData}
        setCourseData={setCourseData}
        clickedData={clickedData}
        searchPage={searchPage}
      />
    </div>
  );
}

export default memo(PlaceMap);
