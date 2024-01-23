import { useNavigate } from "react-router-dom";

function NoReservationData() {
  const navigation = useNavigate();

  return (
    <div className="w-full my-28">
      <p className="text-center text-black">
        내 예약 내역이 없습니다. 다양한 파티에 참여해보세요!
      </p>
      <div className="flex justify-center mt-16">
        <button
          className="h-12 text-white rounded-full text-md w-64 md:w-80 bg-primary"
          onClick={() => navigation("/")}
        >
          다양한 파티 둘러보기
        </button>
      </div>
    </div>
  );
}

export default NoReservationData;
