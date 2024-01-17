import { useState } from "react";
import CourseMap from "../../../components/CourseMap";
import PlaceMap from "../../../components/PlaceMap";
import ToggleButton from "./ToggleButton";

function EditMap({ courseData, setCourseData }) {
  const [showSearchMap, setShowSearchMap] = useState(true);

  return (
    <div>
      <ToggleButton
        showSearchMap={showSearchMap}
        setShowSearchMap={setShowSearchMap}
      />

      {showSearchMap ? (
        <PlaceMap
          search={true}
          newPlace={true}
          detail={false}
          courseData={courseData}
          setCourseData={setCourseData}
        />
      ) : (
        <CourseMap markerData={courseData} reload={true} />
      )}
    </div>
  );
}

export default EditMap;
