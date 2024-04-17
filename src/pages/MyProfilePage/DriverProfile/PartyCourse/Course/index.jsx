import { useNavigate } from "react-router-dom";

function Course({ courseImg, courseName, courseId }) {
  const navigation = useNavigate();

  return (
    <button
      className="relative h-56 sm:h-64"
      onClick={() => navigation(`/my/driver/course/${courseId}`)}
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

export default Course;
