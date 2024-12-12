import { memo } from "react";
import { useNavigate } from "react-router-dom";

function NoHeartData() {
  const navigation = useNavigate();

  return (
    <div className="w-full my-28">
      <p className="text-center text-black">
        나의 찜 목록이 비어있습니다.
        <br />
        좋아하는 파티 또는 여행지를 찾아보세요!
      </p>
      <div className="flex justify-center mt-16">
        <button
          className="h-12 text-white rounded-full text-md w-64 md:w-80 bg-primary"
          onClick={() => navigation("/")}
        >
          다른 파티 둘러보기
        </button>
      </div>
    </div>
  );
}

export default memo(NoHeartData);
