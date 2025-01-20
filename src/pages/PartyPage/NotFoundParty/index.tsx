import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components";

function NotFoundParty() {
  const navigation = useNavigate();

  return (
    <PageContainer>
      <div className="w-full py-28">
        <p className="text-center text-black">
          더 이상 가입이 불가능한 일정입니다.
          <br />
          다른 일정을 찾아보세요!
        </p>
        <div className="flex justify-center mt-16">
          <button
            className="h-12 text-white rounded-full text-md w-64 md:w-80 bg-primary"
            onClick={() => navigation("/", { replace: true })}
          >
            다른 일정 찾아보기
          </button>
        </div>
      </div>
    </PageContainer>
  );
}

export default memo(NotFoundParty);
