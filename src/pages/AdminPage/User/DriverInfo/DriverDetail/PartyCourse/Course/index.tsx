import { memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CourseType } from "../../../../../../../types";

function Course({ courseImg, courseName, courseId }: CourseType) {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const driverId = searchParams.get("driverId");

  return (
    <button
      className="relative h-56 sm:h-64"
      onClick={() =>
        navigation(
          `/admin/driver-info?driverId=${driverId}&courseId=${courseId}`
        )
      }
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={courseImg}
        alt={courseName}
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-center text-lg sm:text-lg text-white font-bold z-10 px-3">
        {courseName}
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 rounded-lg" />
    </button>
  );
}

export default memo(Course);
