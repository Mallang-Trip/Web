import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getPartyRegionList } from "../../../api/region";
import { Destination, RegionData } from "../../../types";
import CourseMap from "../../../components/CourseMap";
import PlaceMap from "../../../components/PlaceMap";
import ToggleButton from "./ToggleButton";

interface Props {
  courseData: Destination[];
  setCourseData: Dispatch<SetStateAction<Destination[]>>;
  setRegion: Dispatch<SetStateAction<string>>;
}

function EditMap({ courseData, setCourseData, setRegion }: Props) {
  const [showSearchMap, setShowSearchMap] = useState(true);
  const [regionData, setRegionData] = useState<RegionData[]>([]);

  const findRegion = useCallback(
    (index: number): string => {
      if (courseData.length === index) return "";

      const targetRegion = regionData.filter((region) =>
        courseData[index]?.address?.includes(region.name)
      )[0];

      return targetRegion?.name || findRegion(index + 1);
    },
    [regionData, courseData]
  );

  const getPartyRegionListFunc = useCallback(async () => {
    try {
      const result = await getPartyRegionList();
      setRegionData(result.payload);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getPartyRegionListFunc();
  }, []);

  useEffect(() => {
    if (courseData.length === 0) setShowSearchMap(true);

    if (setRegion) {
      const targetRegion = findRegion(0);
      setRegion(targetRegion);
    }
  }, [courseData]);

  return (
    <div>
      <ToggleButton
        showSearchMap={showSearchMap}
        setShowSearchMap={setShowSearchMap}
        canToggle={courseData.length > 0}
      />

      {showSearchMap ? (
        <PlaceMap
          search={true}
          searchPage={false}
          courseData={courseData}
          setCourseData={setCourseData}
          onlyAllPlace={true}
        />
      ) : (
        <CourseMap
          markerData={courseData}
          reload={true}
          mapName="TMAP_COURSE"
        />
      )}
    </div>
  );
}

export default memo(EditMap);
