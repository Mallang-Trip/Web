import { useEffect, useState } from "react";
import { getDriverMonthlyIncome } from "../../../../api/income";
import { priceToString } from "../../../../utils";

function MonthlyIncome() {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
  const [totalIncome, setTotalIncome] = useState(0);

  const getThisMonthlyIncome = async () => {
    try {
      const result = await getDriverMonthlyIncome(`${todayYear}-${todayMonth}`);
      setTotalIncome(
        result.payload.reduce(
          (acc, income) => (acc += income.afterCommission),
          0
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getThisMonthlyIncome();
  }, []);

  return (
    <div className="w-full h-44 flex flex-col justify-between border border-[#fafafa] bg-white rounded-3xl shadow-lg px-6 py-4">
      <p className="text-xl text-black font-bold">{`${todayYear}년 ${todayMonth}월`}</p>
      <p className="flex justify-end items-center gap-2">
        <span className="text-sm text-gray500 font-medium">총 수익금</span>
        <span className="text-xl text-primary font-bold">
          {priceToString(totalIncome)}원
        </span>
      </p>
    </div>
  );
}

export default MonthlyIncome;
