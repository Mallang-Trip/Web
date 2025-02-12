import { formatNegativeHour } from "@/utils";
import { memo } from "react";

interface Props {
  index: number;
  name: string;
  time: string | boolean;
  lat?: number;
}

function PlanBox({ index, name, time, lat }: Props) {
  const restTime = name === "휴식" && formatNegativeHour(lat || 0);
  return (
    <div className="relative w-full h-16 md:h-[83px] mb-6 rounded-full bg-skyblue font-bold">
      <div className="w-10 h-10 md:w-14 md:h-14 absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-primary text-white text-lg flex justify-center items-center">
        {index}
      </div>
      <div className="h-full flex justify-between ml-16 md:ml-24 mr-5 md:mr-10 text-boldblue text-md md:text-xl items-center">
        <div>{name}</div>
        <div>{name === "휴식" ? restTime : time}</div>
      </div>
    </div>
  );
}

export default memo(PlanBox);
