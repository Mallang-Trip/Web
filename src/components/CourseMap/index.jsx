import Map from "./Map";

function CourseMap({ partyId, markerData }) {
  return (
    <div>
      <Map markerData={markerData} />
    </div>
  );
}

export default CourseMap;
