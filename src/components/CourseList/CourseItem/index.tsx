import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { isGAlive } from "@/utils/ga";
import ReactGA from "react-ga4";
import clsx from "clsx";

interface Props {
  courseName: string;
  courseId: number;
  selectedCourseId: number;
  setSelectedCourseId: Dispatch<SetStateAction<number>>;
}

function CourseItem({
  courseName,
  courseId,
  selectedCourseId,
  setSelectedCourseId,
}: Props) {
  const clickHandler = useCallback(() => {
    if (isGAlive()) {
      ReactGA.event({
        category: "새로운 파티 만들기",
        action: "08_new_suggestedcourse",
      });
    }
    setSelectedCourseId(courseId);
  }, [courseId]);

  return (
    <button
      className={clsx(
        "shrink-0 px-5 py-2 text-xs md:text-sm whitespace-nowrap border border-current rounded-full hover:bg-primary hover:text-white",
        {
          "text-white bg-primary": courseId == selectedCourseId,
          "text-darkgray": courseId != selectedCourseId,
        }
      )}
      onClick={clickHandler}
    >
      {courseName}
    </button>
  );
}

export default memo(CourseItem);
