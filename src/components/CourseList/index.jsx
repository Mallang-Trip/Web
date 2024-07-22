import CourseItem from "./CourseItem";

function CourseList({ courses, selectedCourseId, setSelectedCourseId }) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">드라이버의 제안 코스</p>
      <div className="flex gap-2 mt-1 overflow-x-auto noScrollBar">
        {courses.length === 0 && (
          // <div className="text-sm text-darkgray font-medium">
          //   제안 코스가 없습니다.
          // </div>
          <CourseItem
            courseName={"+"}
            courseId={-1}
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
          />
        )}
        {courses.map((item) => (
          <CourseItem
            {...item}
            key={item.courseId}
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseList;
