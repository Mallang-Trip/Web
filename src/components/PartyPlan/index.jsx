import { useEffect, useState } from "react";
import PlanBox from "./PlanBox";
import EditButton from "../EditButton";

function PartyPlan({ edit, startDate, course, editHandler }) {
  const [planData, setPlanData] = useState([]);

  useEffect(() => {
    setPlanData(course.days[0].destinations);
  }, []);

  return (
    <div className="w-full md:w-3/4 px-5 mx-auto my-20">
      <div className="flex justify-between items-center text-lg sm:text-2xl text-black font-bold">
        <p>[{course.name}] 일정</p>
        {edit && <EditButton onClick={editHandler} title={"코스 바꾸기"} />}
      </div>
      <p className="text-md md:text-xl font-bold text-darkgray mt-10 mb-6">
        {`${startDate.slice(0, 4)}.${startDate.slice(5, 7)}.${startDate.slice(
          8,
          10
        )} | ${course.days[0].hours}시간`}
      </p>
      {planData.map((item, index) => (
        <PlanBox
          key={item.destinationId}
          name={item.name}
          index={index + 1}
          time={
            index === 0
              ? course.days[0].startTime
              : index === planData.length - 1 && course.days[0].endTime
          }
        />
      ))}
    </div>
  );
}

export default PartyPlan;
