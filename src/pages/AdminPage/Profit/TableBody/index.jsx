import IncomeItem from "./IncomeItem";

function TableBody({
  incomeData,
  setSelectedIncome,
  setShowAmountModal,
  setShowDeleteModal,
}) {
  if (incomeData.length === 0)
    return <div className="mt-20 text-center">총 수익 데이터가 없습니다.</div>;
  return (
    <div>
      {incomeData.map((income) => (
        <IncomeItem
          key={income.incomeId}
          setSelectedIncome={setSelectedIncome}
          setShowAmountModal={setShowAmountModal}
          setShowDeleteModal={setShowDeleteModal}
          {...income}
        />
      ))}
    </div>
  );
}

export default TableBody;
