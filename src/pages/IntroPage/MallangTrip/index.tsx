import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks";
import introIcon from "@/assets/images/intro_icon.png";
import clsx from "clsx";

function MallangTrip() {
  const navigation = useNavigate();
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>();

  return (
    <div className="w-full h-[700px] bg-skyblue flex justify-center items-center text-center px-2 lg:px-0">
      <div
        ref={ref}
        className={clsx(
          isIntersecting ? "animate-fade-up animate-ease-in" : "opacity-0"
        )}
      >
        <p className="text-xl lg:text-3xl text-black font-bold">
          여행을 시작하는 것은 어렵지 않습니다.
          <br />
          우리와 함께 여행을 떠나볼까요?
        </p>
        <img
          src={introIcon}
          alt="말랑트립 아이콘"
          className="mx-auto my-12 w-40"
        />
        <button
          className="w-80 py-4 bg-primary text-white text-base rounded-xl"
          onClick={() => navigation("/")}
        >
          말랑트립 둘러보기
        </button>
      </div>
    </div>
  );
}

export default memo(MallangTrip);
