import { memo } from "react";
import { DriverInfo } from "@/types";
import Course from "./Course";
import NewCourse from "./NewCourse";

interface Props {
  driverInfo: DriverInfo;
}

function PartyCourse({ driverInfo }: Props) {
  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">
        드라이버의 지정 일정 코스
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {driverInfo.courses.map((course) => (
          <Course key={course.courseId} {...course} />
        ))}
        <NewCourse />
      </div>
    </>
  );
}

export default memo(PartyCourse);
