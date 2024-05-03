import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getIncomeList,
  updateIncomeAmount,
  updateIncomeCommission,
  deleteIncome,
} from "../../../api/admin";
import Loading from "../../../components/Loading";
import ConfirmModal from "../../../components/ConfirmModal";
import InputModal from "../../../components/InputModal";
import CheckModal from "../../../components/CheckModal";
import img_more_info from "../../../assets/svg/more-info-gray500.svg";

function Profit() {
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showAmountModal, setShowAmountModal] = useState(false);

  const columns = ["날짜", "파티명", "수입 금액(원)", ""];
  const [dataList, setDataList] = useState();
  const [commissionRate, setCommissionRate] = useState(1.7);
  const [month, setMonth] = useState("ALL");
  const [sum, setSum] = useState(0);

  const getIncomeListFunc = async () => {
    try {
      const result = await getIncomeList(month);
      setDataList(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const updateIncomeAmountFunc = async (amount, id) => {
    try {
      await updateIncomeAmount(amount, id);
      await getIncomeListFunc();
    } catch (e) {
      console.log(e);
    }
  };
  const updateIncomeCommissionFunc = async (penaltyCommissionPercent) => {
    try {
      await updateIncomeCommission(penaltyCommissionPercent);
      await getIncomeListFunc();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteIncomeFunc = async (id) => {
    try {
      await deleteIncome(id);
      await getIncomeListFunc();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getIncomeListFunc();
  }, [month, commissionRate]);

  useEffect(() => {
    if (dataList)
      setSum(
        dataList.reduce((accumulator, data) => {
          return accumulator + data.beforeCommission;
        }, 0)
      );
  }, [dataList]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchKeyword === "") return;
    setSearchKeyword(e.target.value);
  };
  const setWidth = (index) => {
    if (index === 1) return "flex-1";
    else if (index === columns.length - 1) return "w-48";
    else return "w-[20%]";
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("ko-KR", options)
      .replace(/\./g, "")
      .split(" ")
      .join(".");
  };

  const formatPrice = (value) => {
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const extractYearAndMonth = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const onChange = (date) => {
    setSelectedDate(date);
  };

  if (loading) return <Loading full={true} />;
  return (
    <div className=" cursor-default">
      <div className="text-2xl font-bold mb-12">총 수익</div>
      <div className="relative max-w-md mx-auto mb-12">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-primary"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border-2 rounded-full border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-30"
            placeholder="파티명 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit" className="hidden" />
        </form>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex px-4 py-3 text-sm text-gray700 font-semibold">
          합계금:
          <div className="ml-1 text-primary font-bold">
            {formatPrice(sum)}원
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
            onClick={() => {
              setShowCalender(true);
            }}
          >
            {month === "ALL" ? "기간 설정" : formatDate(month).slice(0, 7)}
            <img className="ml-2" alt="" src={img_more_info} />
          </button>
          {showCalender && (
            <div className="absolute w-fit h-fit p-8 top-64 left-1/2 bg-white border border-primary rounded-xl">
              <DatePicker
                selected={selectedDate}
                onChange={onChange}
                inline
                showMonthYearPicker
              />
              <div className="flex justify-center items-center w-full text-sm text-white font-boldmt-2 mt-5">
                <button
                  className="bg-primary rounded-full w-20 h-10 mr-4"
                  onClick={() => {
                    setMonth("ALL");
                    setShowCalender(false);
                  }}
                >
                  전체
                </button>
                <button
                  className="bg-primary rounded-full w-20 h-10"
                  onClick={() => {
                    setMonth(extractYearAndMonth(selectedDate));
                    setShowCalender(false);
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full min-w-[32rem]">
        <div className="flex items-center w-full px-5 py-3 justify-center bg-[#EAF4FF] rounded-xl mb-2 text-sm text-[#313033]">
          {columns.map((item, index) => (
            <div key={index} className={setWidth(index)}>
              {item}
            </div>
          ))}
        </div>
        {dataList &&
          dataList.map((item, index) => (
            <div
              key={index}
              className="flex items-center w-full px-5 py-3 h-10 border border-solid border-[#EFEFEF] rounded-xl mb-2 text-sm"
            >
              <div className="text-gray500 w-1/5 min-w-fit font-medium">
                {formatDate(item.date)}
              </div>
              <div className="text-gray700 flex-1 font-semibold">
                {item.partyName}
              </div>
              <div className="text-primary w-1/5 min-w-fit font-semibold">
                {formatPrice(item.beforeCommission)}
              </div>
              <div className="flex items-center justify-end w-48 font-semibold text-gray500 text-sm whitespace-nowrap">
                <button
                  onClick={() => {
                    setShowAmountModal(true);
                    ref.current = item;
                  }}
                >
                  금액 수정
                </button>
                <hr className="w-[0.0625rem] h-4 mx-3 bg-mediumgray" />
                <button>결제내역</button>
                <hr className="w-[0.0625rem] h-4 mx-3 bg-mediumgray" />
                <button
                  className="text-[#F00]"
                  onClick={() => {
                    setShowDeleteModal(true);
                    ref.current = item;
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
      </div>
      <InputModal
        showModal={showCommissionModal}
        setShowModal={setShowCommissionModal}
        titleMessage={"수수료 비율 변경"}
        subMessage={"수정할 말랑트립의 수수료 비율을 숫자로 입력해주세요."}
        placeholder={`${commissionRate}%`}
        noText={"이전"}
        yesText={"저장"}
        yesHandler={(data) => {
          setShowCommissionModal(false);
          setShowConfirmModal(true);
          setCommissionRate(data);
          updateIncomeCommissionFunc(data);
        }}
      />
      <ConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        message={"수정 완료되었습니다."}
      />
      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message={"삭제하시겠습니까?"}
        noText={"취소"}
        yesText={"삭제"}
        yesHandler={() => {
          setShowDeleteModal(false);
          deleteIncomeFunc(ref.current.incomeId);
        }}
      />
      <InputModal
        showModal={showAmountModal}
        setShowModal={setShowAmountModal}
        titleMessage={"금액 수정"}
        subMessage={"수정할 금액을 숫자로 입력해주세요."}
        placeholder={ref.current ? formatPrice(ref.current.commission) : ""}
        noText={"이전"}
        yesText={"수정"}
        yesHandler={(amount) => {
          setShowAmountModal(false);
          setShowConfirmModal(true);
          updateIncomeAmountFunc(amount, ref.current.incomeId);
        }}
      />
    </div>
  );
}

export default Profit;
