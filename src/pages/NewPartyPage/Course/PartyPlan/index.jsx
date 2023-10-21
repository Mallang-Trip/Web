import { useNavigate } from "react-router-dom";
import EditButton from "../../../../components/EditButton";
import PlanBox from "./PlanBox";

function PartyPlan({ planData, startDate }) {
  const navigate = useNavigate();

  const clickHander = () => navigate(`/`);

  return (
    <div className="w-3/4 mx-auto mt-14">
      <div className="flex justify-between items-center text-lg text-black md:text-2xl font-bold">
        <p>[{planData.name}] 일정</p>
        <EditButton onClick={clickHander} title={"코스 바꾸기"} />
      </div>
      <p className="text-md md:text-xl text-darkgray mt-10 mb-6">
        {`${startDate.slice(0, 4)}.${startDate.slice(5, 7)}.${startDate.slice(
          8,
          10
        )} | ${planData.days[0].day}일차 | ${planData.days[0].hours}시간`}
      </p>
      {planData.days[0].destinations.map((item, index) => (
        <PlanBox
          key={item.destinationId}
          name={item.name}
          index={index + 1}
          time={
            index === 0
              ? planData.days[0].startTime
              : index === planData.days[0].destinations.length - 1 &&
                planData.days[0].endTime
          }
        />
      ))}
    </div>
  );
}

export default PartyPlan;
