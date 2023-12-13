import Course from "./Course";
import NewCourse from "./NewCourse";

function PartyCourse({ driverInfo }) {
  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">
        드라이버의 지정 파티 코스
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {driverInfo.courses.map((course) => (
          <Course key={course.courseId} {...course} />
        ))}
        <NewCourse />
      </div>
    </>
  );
}

export default PartyCourse;
