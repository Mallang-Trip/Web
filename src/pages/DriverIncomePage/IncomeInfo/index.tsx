import { memo } from "react";
import MonthlyIncome from "./MonthlyIncome";
import Account from "./Account";

function IncomeInfo() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-5 justify-between mt-5 mb-20">
      <MonthlyIncome />
      <Account />
    </div>
  );
}

export default memo(IncomeInfo);
