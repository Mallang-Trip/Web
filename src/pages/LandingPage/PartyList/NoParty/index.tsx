import { memo } from "react";
import { useNavigate } from "react-router-dom";

function NoParty() {
  const navigation = useNavigate();

  return (
    <div className="w-full my-28">
      <p className="text-center text-black">
        해당 조건에 맞는 파티가 없습니다.
        <br />
        직접 새로운 파티를 만들어보세요!
      </p>
      <div className="flex justify-center mt-16">
        <button
          className="h-12 text-white rounded-full text-md px-10 bg-primary"
          onClick={() =>
            navigation(
              `/party/new/1?region=${null}&member=${null}&date=${null}&driverId=${null}`
            )
          }
        >
          새로운 파티 만들기
        </button>
      </div>
    </div>
  );
}

export default memo(NoParty);
