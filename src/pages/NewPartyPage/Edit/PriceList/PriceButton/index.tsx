import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { Course } from "@/types";
import clsx from "clsx";

interface Props {
  price: number;
  hours: number;
  planData: Course;
  setPlanData: Dispatch<SetStateAction<Course>>;
}

function PriceButton({ price, hours, planData, setPlanData }: Props) {
  const clickHandler = useCallback(() => {
    setPlanData({
      ...planData,
      totalPrice: price,
      days: [{ ...planData.days[0], price: price, hours: hours }],
    });
  }, [planData, price, hours]);

  return (
    <button
      className={clsx(
        "whitespace-pre w-fit h-8 px-5 text-sm border rounded-full focus:outline-none cursor-pointer",
        planData.days[0].price === price && planData.days[0].hours === hours
          ? "bg-primary text-white border-primary"
          : "bg-white text-darkgray border-darkgray"
      )}
      onClick={clickHandler}
    >
      {hours}시간 {price}원
    </button>
  );
}

export default memo(PriceButton);
