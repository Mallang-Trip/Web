import plusBtn from "../../assets/svg/GrayPlusBtn.svg";
import minusBtn from "../../assets/svg/GrayMinusBtn.svg";
import { useState } from "react";

function EditPeriod() {
  const [period, setPeriod] = useState(1);

  const onClickPlusHandler = () => {
    setPeriod((prevPeriod) => prevPeriod + 1);
  };
  const onClickMinusHandler = () => {
    if (period != 1) {
      setPeriod((prevPeriod) => prevPeriod - 1);
    }
  };
  return (
    <div>
      <div className="text-black text-2xl font-bold pb-1">여행기간</div>
      <div className="flex gap-2">
        <img
          src={minusBtn}
          onClick={onClickMinusHandler}
          className="hover:cursor-pointer"
        />
        <div className="text-blue-400 text-lg font-bold mt-2">{period}일</div>
        <img
          src={plusBtn}
          onClick={onClickPlusHandler}
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
}

export default EditPeriod;
