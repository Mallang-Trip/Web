import CourseItem from "./CourseItem";

function CourseList({
  courses,
  selectedCourseId,
  setSelectedCourseId,
  availableNewCourse,
}) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">현재 예약 가능한 코스</p>
      <div className="flex gap-2 mt-1.5">
        {courses.map((item) => (
          <CourseItem
            {...item}
            key={item.courseId}
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
          />
        ))}
        {availableNewCourse && (
          <CourseItem
            courseName={"코스 새로 만들기"}
            courseId={0}
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
          />
        )}
      </div>
    </div>
  );
}

export default CourseList;
