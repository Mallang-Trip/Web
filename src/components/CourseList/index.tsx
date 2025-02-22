import { Dispatch, memo, SetStateAction } from "react";
import CourseItem from "./CourseItem";

interface Props {
  courses: {
    courseId: number;
    courseImg: string | null;
    courseName: string;
  }[];
  selectedCourseId: number;
  setSelectedCourseId: Dispatch<SetStateAction<number>>;
}

function CourseList({ courses, selectedCourseId, setSelectedCourseId }: Props) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">드라이버의 제안 코스</p>
      <div className="flex gap-2 mt-1 custom-scrollbar pb-1">
        {courses.map((item) => (
          <CourseItem
            {...item}
            key={item.courseId}
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
          />
        ))}
        <CourseItem
          courseName="+"
          courseId={-1}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
        />
      </div>
    </div>
  );
}

export default memo(CourseList);
