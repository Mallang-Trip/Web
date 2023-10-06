import { useNavigate, useParams } from "react-router-dom";

function ReservBtn() {
  const { place } = useParams();
  const navigate = useNavigate();

  const clickHander = () => navigate(`/party/reservation/${place}`);

  return (
    <div className="flex justify-center my-20">
      <button
        className="mx-auto h-12 text-white rounded-full text-lg w-64 md:w-80 bg-primary"
        onClick={clickHander}
      >
        예약하기
      </button>
    </div>
  );
}

export default ReservBtn;
