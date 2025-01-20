import {
  Dispatch,
  ForwardedRef,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Course } from "@/types";
import PriceButton from "./PriceButton";
import clsx from "clsx";

interface Props {
  prices: { hours: number; price: number }[];
  planData: Course;
  setPlanData: Dispatch<SetStateAction<Course>>;
  shakeCoursePrice: boolean;
  coursePriceRef: ForwardedRef<HTMLDivElement>;
}

function PriceList({
  prices,
  planData,
  setPlanData,
  shakeCoursePrice,
  coursePriceRef,
}: Props) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (shakeCoursePrice) setShowText(true);
  }, [shakeCoursePrice]);

  return (
    <div
      ref={coursePriceRef}
      className={clsx(shakeCoursePrice && "animate-shake")}
    >
      <div className="flex flex-col gap-1 my-7">
        <div className="flex items-center gap-1.5">
          <div className="text-lg text-black font-bold">코스 비용</div>
          <div
            className={clsx(
              "text-sm",
              showText ? "text-red-600" : "text-white"
            )}
          >
            코스 시간과 비용을 선택해주세요!
          </div>
        </div>
        <div className="flex gap-2 my-2 overflow-x-auto custom-scrollbar pb-1">
          {prices.map((item, index) => (
            <PriceButton
              key={index}
              {...item}
              planData={planData}
              setPlanData={setPlanData}
            />
          ))}
        </div>
        <p className="text-sm text-gray400 font-normal">
          코스 비용은 드라이버가 운영하는 지역에 따라 책정되었으며 운행 기준
          지역이 다를 경우 일정 생성 제안이 반려될 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default memo(PriceList);
