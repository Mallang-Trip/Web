import { memo } from "react";
import { useNavigate } from "react-router-dom";

function NoArticleData() {
  const navigation = useNavigate();

  return (
    <div className="w-full my-28">
      <p className="text-center text-black">
        존재하지 않는 커뮤니티 게시글 입니다.
      </p>
      <div className="flex justify-center mt-16">
        <button
          className="h-12 text-white rounded-full text-md w-64 md:w-80 bg-primary"
          onClick={() => navigation("/community/main", { replace: true })}
        >
          다른 게시글 둘러보기
        </button>
      </div>
    </div>
  );
}

export default memo(NoArticleData);
