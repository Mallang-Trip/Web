import { useState } from "react";
import Table from "../../../components/Admin/Table";
import img_more_info from "../../../assets/svg/more-info-gray500.svg";

function Profit() {
  const columns = ["날짜", "파티명", "수입 금액(원)"];
  const data = [
    ["2024-04-10", "짱 좋은 파티", "100000"],
    ["2024-04-10", "제주의 가을 파티", "8000"],
    ["2024-04-10", "기분 좋은 바베큐 파티", "10000"],
    ["2024-04-10", "우정의 파티", "5000"],
    ["2024-04-10", "같이가요 파티파티", "7000"],
    ["2024-04-10", "맛집 투어 제천 파티", "7000"],
    ["2024-04-10", "포켓몬 파티", "7000"],
  ];

  const totalProfit = 800000;
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchKeyword === "") return;

    setSearchKeyword("");
  };
  return (
    <div>
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
            placeholder="알림 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit" className="hidden" />
        </form>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex px-4 py-3 text-sm text-gray700 font-semibold">
          합계금:
          <div className="ml-1 text-primary font-bold">{totalProfit}원</div>
        </div>
        <div className="flex">
          <button className="flex items-center justify-center bg-white text-darkgray border border-mediumgray text-xs rounded-lg px-4 py-3 mr-2 mb-3">
            수수료 10%
          </button>
          <button className="flex items-center justify-center bg-white text-darkgray border border-mediumgray text-xs rounded-lg px-4 py-3 mb-3">
            기간 설정
            <img className="ml-2" alt="" src={img_more_info} />
          </button>
        </div>
      </div>
      <div className="w-100 h-10">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Profit;
