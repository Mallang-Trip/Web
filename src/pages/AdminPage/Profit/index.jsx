import React, { useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";
import InputModal from "../../../components/InputModal";
import CheckModal from "../../../components/CheckModal";
import img_more_info from "../../../assets/svg/more-info-gray500.svg";

function Profit() {
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fee, setFee] = useState(null);
  const columns = ["날짜", "파티명", "수입 금액(원)", ""];
  const data = [
    ["2024-04-10", "짱 좋은 파티", 100000],
    ["2024-04-10", "제주의 가을 파티", 8000],
    ["2024-04-10", "기분 좋은 바베큐 파티", 10000],
    ["2024-04-10", "우정의 파티", 5000],
    ["2024-04-10", "같이가요 파티파티", 7000],
    ["2024-04-10", "맛집 투어 제천 파티", 7000],
    ["2024-04-10", "포켓몬 파티", 7000],
  ];

  const totalProfit = 800000;
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchKeyword === "") return;

    setSearchKeyword("");
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
  function formatPrice(value) {
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
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
            {formatPrice(totalProfit)}원
          </div>
        </div>
        <div className="flex">
          <button
            className="flex items-center justify-center bg-white text-darkgray border border-mediumgray text-xs rounded-lg px-4 py-3 mr-2 mb-3"
            onClick={() => setShowChangeModal(true)}
          >
            수수료 {fee ? fee : "10"}%
          </button>
          <button className="relative flex items-center justify-center bg-white text-darkgray border border-mediumgray text-xs rounded-lg px-4 py-3 mb-3">
            기간 설정
            <img className="ml-2" alt="" src={img_more_info} />
          </button>
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
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center w-full px-5 py-3 h-10 border border-solid border-[#EFEFEF] rounded-xl mb-2 text-sm"
          >
            {item.map((it, id) => (
              <div
                key={id}
                className={`${id === 2 ? "text-primary" : "text-[#939094]"} ${id === 1 ? "flex-1 text-[#313033]" : "w-[20%]"} min-w-fit`}
              >
                {id === 0 && formatDate(it)}
                {id === 2 && formatPrice(it)}
                {id !== 0 && id !== 2 && it}
              </div>
            ))}
            <div className="flex items-center justify-end w-48 font-semibold text-gray500 text-sm whitespace-nowrap">
              <button>금액 수정</button>
              <hr className="w-[0.0625rem] h-4 mx-3 bg-mediumgray" />
              <button>결제내역</button>
              <hr className="w-[0.0625rem] h-4 mx-3 bg-mediumgray" />
              <button
                className="text-[#F00]"
                onClick={() => setShowDeleteModal(true)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
      <InputModal
        showModal={showChangeModal}
        setShowModal={setShowChangeModal}
        titleMessage={"수수료 비율 변경"}
        subMessage={"수정할 말랑트립의 수수료 비율을 숫자로 입력해주세요."}
        noText={"이전"}
        yesText={"저장"}
        yesHandler={(data) => {
          setShowChangeModal(false);
          setShowConfirmModal(true);
          setFee(data);
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
        }}
      />
    </div>
  );
}

export default Profit;
