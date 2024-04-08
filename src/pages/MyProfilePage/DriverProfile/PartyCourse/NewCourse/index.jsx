import { useNavigate } from "react-router-dom";
import primaryPlus from "../../../../../assets/svg/primary_plus.svg";

function NewCourse() {
  const navigation = useNavigate();

  return (
    <button
      className="h-56 sm:h-64 bg-skyblue border border-dashed border-primary rounded-lg flex justify-center items-center"
      onClick={() => navigation("/my/driver/course/new")}
    >
      <img src={primaryPlus} alt="plus" className="w-6 h-6" />
    </button>
  );
}

export default NewCourse;
