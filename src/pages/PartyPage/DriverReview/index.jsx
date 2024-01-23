import { useNavigate } from "react-router-dom";
import { computeGapDay } from "../../../utils";

function DriverReview({ driverId, startDate }) {
  const navigation = useNavigate();

  if (computeGapDay(startDate) > 0) return null;
  return (
    <div className="my-7">
      <p className="text-lg text-black font-bold">드라이버 리뷰를 남겨주세요</p>
      <div className="my-2.5 flex justify-center sm:justify-start sm:ml-48 items-center">
        <button
          className="w-44 py-3 text-lg font-bold border rounded-full bg-primary text-white border-primary"
          onClick={() => navigation(`/driver/profile/${driverId}`)}
        >
          리뷰 작성하기
        </button>
      </div>
    </div>
  );
}

export default DriverReview;
