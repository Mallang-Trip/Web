import { memo } from "react";
import { useNavigate } from "react-router-dom";

function NoData() {
  const navigation = useNavigate();

  return (
    <div className="w-full my-28">
      <p className="text-center text-black">드라이버 프로필 정보가 없습니다.</p>
      <div className="flex justify-center mt-16">
        <button
          className="h-12 text-white rounded-full text-md w-64 md:w-80 bg-primary"
          onClick={() => navigation("/")}
        >
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default memo(NoData);
