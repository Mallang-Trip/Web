import Map from "./Map";

// 맵 위에 있는 버튼을 만들어서 1일차/2일차라는 정보를 Map에 전달해야함.

function CourseMap({ partyId, markerData }) {
  return (
    <div>
      <Map markerData={markerData} />
    </div>
  );
}

export default CourseMap;
