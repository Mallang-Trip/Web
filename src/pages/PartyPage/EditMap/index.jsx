import { useEffect, useState } from "react";
import CourseMap from "../../../components/CourseMap";
import PlaceMap from "../../../components/PlaceMap";
import ToggleButton from "./ToggleButton";

function EditMap({ courseData, setCourseData, setRegion }) {
  const [showSearchMap, setShowSearchMap] = useState(true);

  useEffect(() => {
    if (courseData.length === 0) setShowSearchMap(true);
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
          setRegion={setRegion}
        />
      )}
    </div>
  );
}

export default EditMap;
