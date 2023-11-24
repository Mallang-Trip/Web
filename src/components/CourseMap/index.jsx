import React from "react";
import Map from "./Map";

// 맵 위에 있는 버튼을 만들어서 1일차/2일차라는 정보를 Map에 전달해야함.

function CourseMap({ partyId, courseData, markerData }) {
  //
  if (!courseData || courseData[0] === null) {
    console.log("empty");
  }

  // console.log(courseData);
  console.log(courseData.course.days[0].destinations);
  console.log(markerData);
  return (
    <div>
      <Map courseData={courseData} markerData={markerData} />
    </div>
  );
}

export default CourseMap;
