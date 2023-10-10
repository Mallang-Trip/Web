import { useNavigate, useParams } from "react-router-dom";
import PlanBox from "./PlanBox";
import EditButton from "../EditButton";

const planData = [
  {
    name: "집합:제주공항 1게이트",
    time: "10:00",
  },
  {
    name: "9.81파크 제주",
    time: "11:00",
  },
  {
    name: "녹색식당",
    time: "12:00",
  },
  {
    name: "아르떼 뮤지엄",
    time: "13:30",
  },
  {
    name: "어음분교 1963 카페",
    time: "15:00",
  },
  {
    name: "수원봉 전망대",
    time: "16:00",
  },
  {
    name: "제주돔베고기집",
    time: "17:00",
  },
  {
    name: "해산: 각자 숙소까지 이동",
    time: "18:00",
  },
];

function PartyPlan({ edit }) {
  const { place } = useParams();
  const navigate = useNavigate();

  const clickHander = () => navigate(`/party/course/suggest/${place}`);

  return (
    <div className="w-3/4 mx-auto mt-14">
      <div className="flex justify-between items-center text-lg text-black md:text-2xl font-bold">
        <p>[{place}] 일정</p>
        {edit && <EditButton onClick={clickHander} title={"코스 바꾸기"} />}
      </div>
      <p className="text-md md:text-xl text-darkgray mt-10 mb-6">
        2023.04.01 | 1일차 | 8시간
      </p>
      {planData.map((item, index) => (
        <PlanBox key={item.name} item={item} index={index + 1} />
      ))}
    </div>
  );
}

export default PartyPlan;
