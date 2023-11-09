import React from "react";
import Map from "./Map";
import { useState, useEffect } from "react";
import { getPartyDetail } from "../../api/party";
import { useParams } from "react-router-dom";
function CourseMap() {
  const { partyId } = useParams();
  const [courseData, setCourseData] = useState({});
  //console.log(params);
  const getPartyCourse = async () => {
    try {
      const result = await getPartyDetail(partyId);
      setCourseData(result);
      console.log(result);
      console.log(result.payload.course.days[0].destinations);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPartyCourse();
  }, [partyId]);

  return (
    <div>
      <Map course={courseData} />
    </div>
  );
}

export default CourseMap;
