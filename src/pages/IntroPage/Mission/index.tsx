import { memo } from "react";
import { useIntersectionObserver } from "../../../hooks";
import clsx from "clsx";

function Mission() {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>();

  return (
    <div className="w-full h-[700px] bg-white flex justify-center items-center text-center px-2 lg:px-0">
      <div
        ref={ref}
        className={clsx(
          isIntersecting ? "animate-fade-up animate-ease-in" : "opacity-0"
        )}
      >
        <p className="text-xl text-primary">OUR MISSION</p>
        <p className="text-xl lg:text-3xl text-black font-bold mt-1 mb-5">
          국내 여행지로 출발하여 전세계로 도착하는 것
        </p>
        <p className="text-sm lg:text-base text-black">
          전세계의 많은 뚜벅이 여행자들이 안전, 시간, 비용 문제에 많은 어려움을
          겪고 있습니다.
          <br />
          말랑트립은 이 문제들을 전부 해결하기 위해 노력합니다.
        </p>
      </div>
    </div>
  );
}

export default memo(Mission);
