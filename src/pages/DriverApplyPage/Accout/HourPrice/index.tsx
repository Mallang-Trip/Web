import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { onlyNumber } from "@/utils";
import primaryPlus from "@/assets/svg/primary_plus.svg";

interface Props {
  hour: string[];
  setHour: Dispatch<SetStateAction<string[]>>;
  money: string[];
  setMoney: Dispatch<SetStateAction<string[]>>;
  index: number;
  isShow: boolean;
}

function HourPrice({ hour, setHour, money, setMoney, index, isShow }: Props) {
  const [show, setShow] = useState(isShow);

  const hourHandler = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const hourTemp = [...hour];
      hourTemp[index] = target.value;
      setHour(hourTemp);
    },
    [hour, index]
  );

  const moneyHandler = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const moneyTemp = [...money];
      moneyTemp[index] = target.value;
      setMoney(moneyTemp);
    },
    [money, index]
  );

  if (!show)
    return (
      <div
        className="w-[300px] h-14 mx-auto my-5 bg-skyblue border border-dashed border-primary rounded-2xl cursor-pointer flex justify-center items-center"
        onClick={() => setShow(true)}
      >
        <img src={primaryPlus} alt="plus" />
      </div>
    );
  else
    return (
      <div className="flex gap-1.5 justify-center items-center h-14 my-5">
        <input
          type="text"
          name="hour"
          className="w-12 text-center border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block p-2.5"
          value={onlyNumber(hour[index])}
          onChange={hourHandler}
          autoComplete="off"
        />
        <span className="text-sm text-darkgray">시간당</span>
        <input
          type="text"
          name="money"
          className="w-24 text-center border border-mediumgray text-black text-sm rounded-lg focus:outline-primary block p-2.5"
          value={onlyNumber(money[index]).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          onChange={moneyHandler}
          autoComplete="off"
        />
        <span className="text-sm text-darkgray">원</span>
      </div>
    );
}

export default memo(HourPrice);
