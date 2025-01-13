import { loadNaverScript } from "@/utils/naverTracking";
import { memo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Complete() {
  const navigation = useNavigate();

  const goLogin = useCallback(() => navigation("/login"), []);

  const goHome = useCallback(() => navigation("/"), []);

  useEffect(() => {
    const cleanup = loadNaverScript("sign_up");
    return cleanup;
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col justify-center my-24 px-5 text-base font-medium text-center text-black">
        말랑트립의 회원이 되신 것을 진심으로 환영합니다.
        <br />
        로그인 후 말랑트립의 다양한 서비스를 마음껏 즐겨보세요!
      </div>
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          className="h-12 text-white rounded-full text-md w-64 sm:w-80 bg-primary"
          onClick={goLogin}
        >
          로그인
        </button>
        <button
          type="button"
          className="h-12 bg-white border rounded-full text-darkgray text-md w-64 sm:w-80 border-darkgray"
          onClick={goHome}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default memo(Complete);
