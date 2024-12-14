import { memo } from "react";
import { useNavigate } from "react-router-dom";

function NoHistoryData() {
  const navigation = useNavigate();

  return (
    <div className="w-full my-28">
      <p className="text-center text-black">
        최근 본 파티가 없습니다. 다른 파티들을 둘러보세요!
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

export default memo(NoHistoryData);
