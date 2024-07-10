import { useEffect, useState } from "react";
import { getPartyRegionList } from "../../../api/region";
import CourseMap from "../../../components/CourseMap";
import PlaceMap from "../../../components/PlaceMap";
import ToggleButton from "./ToggleButton";

function EditMap({ courseData, setCourseData, setRegion }) {
  const [showSearchMap, setShowSearchMap] = useState(true);
  const [regionData, setRegionData] = useState([]);

  const findRegion = (index) => {
    if (courseData.length === index) return null;

    const targetRegion = regionData.filter((region) =>
      courseData[index]?.address?.includes(region.name)
    )[0];

    return targetRegion?.name || findRegion(index + 1);
  };

  const getPartyRegionListFunc = async () => {
    try {
      const result = await getPartyRegionList();
      setRegionData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

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
          newPlace={true}
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

export default EditMap;
