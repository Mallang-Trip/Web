import { useNavigate } from "react-router-dom";

function Course({ courseImg, courseName, courseId }) {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/course/edit/${courseId}`);
  };
  return (
    <div
      className="relative h-56 sm:h-64 cursor-pointer"
      onClick={onClickHandler}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={courseImg}
        alt="party-image"
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-lg sm:text-xl text-white">
        {courseName}
      </div>
    </div>
  );
}

export default Course;
