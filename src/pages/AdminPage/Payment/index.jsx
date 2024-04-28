import { useState } from "react";
import TabList from "../../../components/Admin/TabList";
import Container from "./Container";

function Payment() {
  const tabList = [
    { name: "예약된 파티", id: "booked" },
    { name: "취소된 파티", id: "canceled" },
    { name: "완료된 파티", id: "done" },
  ];

  const mockData = [
    {
      name: "순천 식도락 파티",
      date: "2024-04-04",
      id: "123456789110000",
      driver: "김현식",
      member: 4,
      totalMember: 4,
      memberInfo: ["여행자1", "여행자2", "여행자3", "여행자4"],
    },
    {
      name: "왁자지껄 파티",
      date: "2024-04-04",
      id: "123456789110001",
      driver: "나현웅",
      member: 3,
      totalMember: 4,
      memberInfo: ["여행자1", "여행자2", "여행자3"],
    },
    {
      name: "새해 다음날 파티",
      date: "2024-04-04",
      id: "123456789110002",
      driver: "나현웅",
      member: 3,
      totalMember: 4,
      memberInfo: ["여행자1", "여행자2", "여행자3"],
    },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchKeyword === "") return;

    setSearchKeyword("");
  };

  return (
    <div>
      <div className="text-2xl font-bold">결제 내역 확인</div>
      <TabList tabList={tabList} />
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
            placeholder="파티명 또는 닉네임 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit" className="hidden" />
        </form>
      </div>
      {mockData.map((item, index) => (
        <Container key={index} {...item} />
      ))}
    </div>
  );
}

export default Payment;
