import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlanBox from "./PlanBox";
import EditButton from "../EditButton";

function PartyPlan({ edit, startDate, course }) {
  const { partyId } = useParams();
  const navigate = useNavigate();
  const [planData, setPlanData] = useState([]);

  const clickHander = () => navigate(`/party/course/suggest/${partyId}`);
  useEffect(() => {
    setPlanData(course.days[0].destinations);
  }, []);
  return (
    <div className="w-3/4 mx-auto mt-14">
      <div className="flex justify-between items-center text-lg text-black md:text-2xl font-bold">
        <p>[{course.name}] 일정</p>
        {edit && <EditButton onClick={clickHander} title={"코스 바꾸기"} />}
      </div>
      <p className="text-md md:text-xl text-darkgray mt-10 mb-6">
        {`${startDate.slice(0, 4)}.${startDate.slice(5, 7)}.${startDate.slice(
          8,
          10
        )} | ${course.days[0].day}일차 | ${course.days[0].hours}시간`}
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
