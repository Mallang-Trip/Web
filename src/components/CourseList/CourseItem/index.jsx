import { useCallback } from "react";
import ReactGA from "react-ga4";

function CourseItem({
  courseName,
  courseId,
  selectedCourseId,
  setSelectedCourseId,
}) {
  const clickHandler = useCallback(() => {
    const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
    const META_PIXEL_TRACKING_ID = import.meta.env.VITE_META_PIXEL_TRACKING_ID;

    if (
      GA_TRACKING_ID &&
      META_PIXEL_TRACKING_ID &&
      !window.location.href.includes("localhost")
    ) {
      ReactGA.event({
        category: "새로운 파티 만들기",
        action: "08_new_suggestedcourse",
      });
    }

    setSelectedCourseId(courseId);
  }, [courseId]);

  return (
    <button
      className={`shrink-0 px-5 py-2 text-xs md:text-sm whitespace-nowrap border border-current rounded-full hover:bg-primary hover:text-white ${
        courseId == selectedCourseId ? "text-white bg-primary" : "text-darkgray"
      }`}
      onClick={clickHandler}
    >
      {courseName}
    </button>
  );
}

export default CourseItem;
