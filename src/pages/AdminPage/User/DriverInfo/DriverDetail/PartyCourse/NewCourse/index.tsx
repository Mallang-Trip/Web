import { memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import primaryPlus from "@/assets/svg/primary_plus.svg";

function NewCourse() {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const driverId = searchParams.get("driverId");

  return (
    <button
      className="h-56 sm:h-64 bg-skyblue border border-dashed border-primary rounded-lg flex justify-center items-center"
      onClick={() =>
        navigation(`/admin/driver-info?driverId=${driverId}&courseId=new`)
      }
    >
      <img src={primaryPlus} alt="plus" className="w-6 h-6" />
    </button>
  );
}

export default memo(NewCourse);
