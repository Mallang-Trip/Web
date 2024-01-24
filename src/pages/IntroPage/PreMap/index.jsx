import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

function PreMap() {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <div className="w-full h-[700px] bg-[#171717] flex justify-center items-center text-center px-2 md:px-0">
      <div
        ref={ref}
        className={`${
          isIntersecting ? "animate-fade-up animate-ease-in" : "opacity-0"
        }`}
      >
        <div className="text-2xl md:text-3xl text-lightgray font-bold mb-8">
          말랑트립은 경기콘텐츠진흥원
          <br />
          PRE-MAP의 지원을 받았습니다.
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div className="border-2 border-lightgray rounded-full py-2 px-4 text-lightgray text-xs md:text-sm font-bold">
            2023.08
          </div>
          <div className="text-lightgray text-base md:text-xl">
            PRE-MAP 지원금 유치
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreMap;
