import React from "react";
import { useParams } from "react-router-dom";
import ChangeBtn from "../../../assets/svg/ChgCourseBtn.svg";
import PlanBox from "../Atoms/PlanBox";

function PartyPlan() {
  const { place } = useParams();

  return (
    <div>
      <div className=" flex flex-wrap items-center justify-between pl-20 pt-[55px] pr-10 mx-auto overflow-hidden text-[23px] font-bold">
        <p>[{place}] 일정</p>
        <img src={ChangeBtn} />
      </div>
      <div className="max-w-screen-xl  pl-20">
        <p className="text-[21px] text-gray pt-[48px]">
          {" "}
          2023.04.01 | 1일차 | 8시간
        </p>
        <PlanBox />
      </div>
    </div>
  );
}

export default PartyPlan;
