import { useNavigate } from "react-router-dom";
import { priceToString } from "../../../../../utils";

function IncomeItem({
  incomeId,
  partyId,
  date,
  partyName,
  beforeCommission,
  setSelectedIncome,
  setShowAmountModal,
  setShowDeleteModal,
}) {
  const navigation = useNavigate();

  return (
    <div className="flex items-center w-full px-5 py-3 h-10 border border-solid border-[#EFEFEF] rounded-xl mb-2 text-sm">
      <div className="text-gray500 w-1/5 min-w-fit font-medium">
        {date.replaceAll("-", ".")}
      </div>
      <div
        className="text-gray700 flex-1 font-semibold cursor-pointer"
        onClick={() => navigation(`/admin/party?party_id=${partyId}`)}
      >
        {partyName}
      </div>
      <div className="text-primary w-1/5 min-w-fit font-semibold">
        {priceToString(beforeCommission)}
      </div>
      <div className="flex items-center justify-end w-48 font-medium text-gray500 text-sm whitespace-nowrap">
        <button
          onClick={() => {
            setShowAmountModal(true);
            setSelectedIncome({
              incomeId: incomeId,
              beforeCommission: beforeCommission,
            });
          }}
        >
          금액 수정
        </button>
        <hr className="w-[0.0625rem] h-4 mx-3 bg-mediumgray" />
        <button onClick={() => navigation("/admin/payment")}>결제내역</button>
        <hr className="w-[0.0625rem] h-4 mx-3 bg-mediumgray" />
        <button
          className="text-[#F00]"
          onClick={() => {
            setShowDeleteModal(true);
            setSelectedIncome({
              incomeId: incomeId,
              beforeCommission: beforeCommission,
            });
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default IncomeItem;
