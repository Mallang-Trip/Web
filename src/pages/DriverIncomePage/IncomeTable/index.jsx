import { useEffect, useState } from "react";
import { getDriverMonthlyIncome } from "../../../api/income";
import Loading from "../../../components/Loading";
import Body from "./Body";
import Head from "./Head";

function IncomeTable() {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMonthlyIncome = async () => {
    try {
      const result = await getDriverMonthlyIncome("all");
      setIncomeData(result.payload);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMonthlyIncome();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="w-full">
      <p className="text-xl text-black font-bold mb-4">수익금 내역</p>
      {incomeData.length === 0 ? (
        <div>수익금 내역이 없습니다.</div>
      ) : (
        <div className="w-full flex flex-col gap-2 text-sm font-semibold">
          <Head />
          {incomeData.map((income) => (
            <Body key={income.incomeId} {...income} />
          ))}
        </div>
      )}
    </div>
  );
}

export default IncomeTable;
