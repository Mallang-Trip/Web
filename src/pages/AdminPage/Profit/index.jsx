import { useEffect, useState } from "react";
import { priceToString } from "../../../utils";
import { getCommisionRate } from "../../../api/income";
import {
  getIncomeList,
  updateIncomeAmount,
  updateCommissionPercent,
  deleteIncome,
} from "../../../api/admin";
import Loading from "../../../components/Loading";
import ConfirmModal from "../../../components/ConfirmModal";
import InputModal from "../../../components/InputModal";
import CheckModal from "../../../components/CheckModal";
import Title from "../../../components/Title";
import MonthModal from "./MonthModal";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import img_more_info from "../../../assets/svg/more-info-gray500.svg";

function Profit() {
  const [commissionRate, setCommissionRate] = useState("0");
  const [month, setMonth] = useState("ALL");
  const [incomeData, setIncomeData] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState({
    incomeId: 0,
    beforeCommission: 0,
  });
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCommisionRateFunc = async () => {
    try {
      const result = await getCommisionRate();
      setCommissionRate(
        String(parseFloat(result.payload.partyCommissionPercent))
      );
    } catch (e) {
      console.log(e);
    }
  };

  const updateIncomeCommissionFunc = async (partyCommissionPercent) => {
    try {
      await updateCommissionPercent(parseFloat(partyCommissionPercent));
      getCommisionRateFunc();
      setShowCommissionModal(false);
      setShowConfirmModal(true);
    } catch (e) {
      console.log(e);
      alert("수수료 수정에 실패했습니다.");
    }
  };

  const getIncomeListFunc = async () => {
    try {
      const result = await getIncomeList(month);
      setIncomeData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const updateIncomeAmountFunc = async (amount) => {
    try {
      await updateIncomeAmount(amount, selectedIncome.incomeId);
      getIncomeListFunc();
      setShowAmountModal(false);
      setShowConfirmModal(true);
    } catch (e) {
      console.log(e);
      alert("금액 수정에 실패했습니다.");
    }
  };

  const deleteIncomeFunc = async () => {
    try {
      await deleteIncome(selectedIncome.incomeId);
      getIncomeListFunc();
      setShowDeleteModal(false);
      setShowConfirmModal(true);
    } catch (e) {
      console.log(e);
      alert("삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    getIncomeListFunc();
    getCommisionRateFunc();
  }, [month]);

  if (loading) return <Loading full={true} />;
  return (
    <div className="text-base text-black font-medium">
      <Title title="총 수익" />
      <div className="mt-10 flex justify-between items-end">
        <div className="flex px-4 py-3 text-sm text-gray700 font-semibold">
          합계금:
          <div className="ml-1 text-primary font-bold">
            {priceToString(
              incomeData.reduce((accumulator, data) => {
                return accumulator + data.beforeCommission;
              }, 0)
            )}
            원
          </div>
        </div>
        <div className="flex">
          <button
            className="flex items-center justify-center bg-white text-darkgray border border-mediumgray text-xs rounded-lg px-4 py-3 mr-2 mb-3"
            onClick={() => setShowCommissionModal(true)}
          >
            수수료 {commissionRate}%
          </button>
          <button
            className="flex items-center justify-center bg-white text-darkgray border border-mediumgray text-xs rounded-lg px-4 py-3 mb-3"
            onClick={() => setShowCalender(true)}
          >
            {month === "ALL" ? "기간 설정" : month.replaceAll("-", ".")}
            <img className="ml-2" alt="기간 설정" src={img_more_info} />
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full min-w-[32rem]">
        <TableHead />
        <TableBody
          incomeData={incomeData}
          setSelectedIncome={setSelectedIncome}
          setShowAmountModal={setShowAmountModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      </div>
      <MonthModal
        showModal={showCalender}
        setShowModal={setShowCalender}
        setMonth={setMonth}
      />
      <InputModal
        showModal={showCommissionModal}
        setShowModal={setShowCommissionModal}
        titleMessage="수수료 비율 변경"
        subMessage="수정할 말랑트립의 수수료 비율을 숫자로 입력해주세요."
        placeholder={commissionRate}
        noText="취소"
        yesText="저장"
        yesHandler={updateIncomeCommissionFunc}
      />
      <InputModal
        showModal={showAmountModal}
        setShowModal={setShowAmountModal}
        titleMessage="금액 수정"
        subMessage="수정할 금액을 숫자로 입력해주세요."
        placeholder={selectedIncome.beforeCommission}
        noText="취소"
        yesText="저장"
        yesHandler={updateIncomeAmountFunc}
      />
      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message="삭제하시겠습니까?"
        noText="취소"
        yesText="삭제"
        yesHandler={deleteIncomeFunc}
      />
      <ConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        message="완료되었습니다."
      />
    </div>
  );
}

export default Profit;
