import { useState } from "react";
import { onlyNumber } from "../../../../utils";
import primaryPlus from "../../../../assets/svg/primary_plus.svg";

function HourPrice({ hour, setHour, money, setMoney, index, isShow }) {
  const [show, setShow] = useState(isShow);

  const hourHandler = ({ target }) => {
    const hourTemp = [...hour];
    hourTemp[index] = target.value;
    setHour(hourTemp);
  };
  const moneyHandler = ({ target }) => {
    const moneyTemp = [...money];
    moneyTemp[index] = target.value;
    setMoney(moneyTemp);
  };

  if (!show)
    return (
      <div
        className="w-[300px] h-14 mx-auto my-5 bg-[#EAF4FF] border border-dashed border-primary rounded-2xl cursor-pointer flex justify-center items-center"
        onClick={() => setShow(true)}
      >
        <img src={primaryPlus} alt="plus" />
      </div>
    );
  else
    return (
      <div className="flex gap-1 justify-center items-center h-14 my-5">
        <input
          type="text"
          name="hour"
          className="w-8 border-b border-darkgray focus:outline-none focus:border-primary text-center"
          value={onlyNumber(hour[index])}
          onChange={hourHandler}
          autoComplete="off"
        />
        <span className="text-sm text-darkgray">시간당</span>
        <input
          type="text"
          name="money"
          className="w-20 border-b border-darkgray focus:outline-none focus:border-primary text-center"
          value={onlyNumber(money[index]).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={moneyHandler}
          autoComplete="off"
        />
        <span className="text-sm text-darkgray">원</span>
      </div>
    );
}

export default HourPrice;
