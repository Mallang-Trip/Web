function CourseItem({
  courseName,
  courseId,
  selectedCourseId,
  setSelectedCourseId,
}) {
  return (
    <button
      className={`px-5 py-2 text-xs md:text-sm border border-current rounded-full hover:bg-primary hover:text-white ${
        courseId === selectedCourseId
          ? "text-white bg-primary"
          : "text-darkgray"
      }`}
      onClick={() => setSelectedCourseId(courseId)}
    >
      {courseName}
    </button>
  );
}

export default CourseItem;