import { memo } from "react";
import { useIntersectionObserver } from "../../../hooks";
import clsx from "clsx";

function PreMap() {
  const [premapRef, premapIsIntersecting] =
    useIntersectionObserver<HTMLDivElement>();
  const [acceleratorRef, acceleratorIsIntersecting] =
    useIntersectionObserver<HTMLDivElement>();
  const [voucherRef, voucherRefIsIntersecting] =
    useIntersectionObserver<HTMLDivElement>();

  return (
    <div className="w-full min-h-[700px] py-20 bg-[#171717] flex flex-col lg:flex-row justify-center items-center text-center gap-20 px-2">
      <div
        ref={premapRef}
        className={clsx(
          premapIsIntersecting ? "animate-fade-up animate-ease-in" : "opacity-0"
        )}
      >
        <div className="text-2xl text-lightgray font-bold mb-8 h-24 flex justify-center items-end lg:items-center">
          말랑트립은 경기콘텐츠진흥원
          <br />
          PRE-MAP의 지원을 받았습니다.
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
          <div className="border-2 border-lightgray rounded-full py-2 px-4 text-lightgray text-xs font-bold">
            2023.08
          </div>
          <div className="text-lightgray text-base">
            경기콘텐츠진흥원 PRE-MAP 지원금 유치
          </div>
        </div>
      </div>
      <div
        ref={acceleratorRef}
        className={clsx(
          acceleratorIsIntersecting
            ? "animate-fade-up animate-ease-in"
            : "opacity-0"
        )}
      >
        <div className="text-2xl text-lightgray font-bold mb-8 h-24 flex justify-center items-end lg:items-center">
          말랑트립은 안양산업진흥원 주관
          <br />
          「2024 관광 액셀러레이팅 프로그램」
          <br />
          지원을 받았습니다.
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
          <div className="border-2 border-lightgray rounded-full py-2 px-4 text-lightgray text-xs font-bold">
            2024.03
          </div>
          <div className="text-lightgray text-base">
            「2024 관광 액셀러레이팅 프로그램」 참여기업 선정
          </div>
        </div>
      </div>
      <div
        ref={voucherRef}
        className={clsx(
          voucherRefIsIntersecting
            ? "animate-fade-up animate-ease-in"
            : "opacity-0"
        )}
      >
        <div className="text-2xl text-lightgray font-bold mb-8 h-24 flex justify-center items-end lg:items-center">
          말랑트립은 관광기업 혁신바우처의
          <br />
          지원을 받았습니다.
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
          <div className="border-2 border-lightgray rounded-full py-2 px-4 text-lightgray text-xs font-bold">
            2024.04
          </div>
          <div className="text-lightgray text-base">
            관광기업 혁신바우처 지원사업 수혜기업 선정
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PreMap);
