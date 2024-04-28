import { useState } from "react";
import TabList from "../../../../components/Admin/TabList";

function Service() {
  const [current, setCurrent] = useState(0);
  const tabList = [
    { name: "공지사항", id: "notice" },
    { name: "FAQ", id: "FAQ" },
  ];
  const mockDataNotice = [
    { id: 0, title: "결제 방식에 대한 안내", date: "2023-08-09" },
    { id: 1, title: "결제 방식에 대한 안내", date: "2023-08-09" },
    { id: 2, title: "결제 방식에 대한 안내", date: "2023-08-09" },
    { id: 3, title: "결제 방식에 대한 안내", date: "2023-08-09" },
    { id: 4, title: "결제 방식에 대한 안내", date: "2023-08-09" },
    { id: 5, title: "결제 방식에 대한 안내", date: "2023-08-09" },
    { id: 6, title: "결제 방식에 대한 안내", date: "2023-08-09" },
    { id: 7, title: "결제 방식에 대한 안내", date: "2023-08-09" },
    { id: 8, title: "결제 방식에 대한 안내", date: "2023-08-09" },
    { id: 9, title: "결제 방식에 대한 안내", date: "2023-08-09" },
    { id: 10, title: "결제 방식에 대한 안내", date: "2023-08-09" },
    { id: 11, title: "결제 방식에 대한 안내", date: "2023-08-09" },
  ];
  const mockDataFAQ = [
    { id: 0, title: "결제는 어떻게 하나요?" },
    { id: 1, title: "예약 내역은 어디서 확인하나요?" },
    { id: 2, title: "예약을 완료했는데 코스를 수정할 수 있나요?" },
    { id: 3, title: "혼자서 여행하고 싶은데 독점예약이 가능한가요?" },
    { id: 4, title: "환불요청은 어디서 하나요?" },
    { id: 5, title: "환불은 언제쯤 받을 수 있나요?" },
    { id: 6, title: "아이 동반일 경우 아이도 요금을 내나요?" },
    { id: 7, title: "4인승 차량에 5명 신청해도 되나요?" },
    { id: 8, title: "짐도 맡길 수 있나요?" },
    { id: 9, title: "드라이버를 변경하고 싶은데 가능한가요?" },
  ];

  const [currentData, setCurrentData] = useState(mockDataNotice);
  const changeTab = (current) => {
    setCurrent(current);
    if (current === 0) {
      setCurrentData(mockDataNotice);
    } else {
      setCurrentData(mockDataFAQ);
    }
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchKeyword === "") return;

    setSearchKeyword("");
  };

  return (
    <div>
      <div className="text-2xl font-bold">고객센터 글 작성/수정/삭제</div>
      <TabList tabList={tabList} changeTab={changeTab} />
      <div className="relative max-w-md mx-auto mb-16">
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
      <div className="flex w-full justify-end mb-3">
        <button className="flex items-center justify-center w-20 h-10 bg-white text-darkgray border border-mediumgray text-sm rounded-xl px-auto py-1 mr-3">
          삭제
        </button>
        <button className="flex items-center w-2- h-10 bg-skyblue text-primary border border-primary text-sm rounded-xl pl-8 pr-5 py-1">
          {current === 0 ? "편집" : "글 작성"}
        </button>
      </div>
      <div className="flex w-full h-14 items-center text-sm bg-skyblue border-t-2 border-mediumgray font-bold">
        <div className="flex justify-center mx-6">
          <input type="checkbox" />
        </div>
        <div className="flex w-12">번호</div>
        <div className="flex-1">제목</div>
        {current === 0 && (
          <div className="flex justify-center w-[20%]">작성일</div>
        )}
      </div>
      {currentData.map((item, index) => (
        <div
          key={index}
          className="flex w-full h-14 items-center text-sm bg-white border-t-2 border-mediumgray font-medium"
        >
          <div className="flex justify-center mx-6">
            <input type="checkbox" />
          </div>
          <div className="flex justify-center w-12 pr-6">{item.id + 1}</div>
          <div className="flex-1">{item.title}</div>
          {current === 0 && (
            <div className="flex justify-center w-[20%]">{item.date}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Service;
