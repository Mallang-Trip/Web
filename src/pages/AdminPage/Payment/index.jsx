import { useEffect, useState } from "react";
import { getPaymentList } from "../../../api/admin";
import Loading from "../../../components/Loading";
import TabList from "../../../components/Admin/TabList";
import Container from "./Container";
import img_more_info from "../../../assets/svg/more-info-gray500.svg";

function Payment() {
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [current, setCurrent] = useState("reserved");

  const tabList = [
    { name: "예약된 파티", id: "reserved" },
    { name: "취소된 파티", id: "canceled" },
    { name: "완료된 파티", id: "finished" },
  ];
  const [dataList, setDataList] = useState();

  const getPaymentListFunc = async () => {
    try {
      const result = await getPaymentList(current);
      setDataList(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaymentListFunc();
  }, [current]);

  const changeTab = (index) => {
    if (index === 0) setCurrent("reserved");
    else if (index === 1) setCurrent("canceled");
    else setCurrent("finished");
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchKeyword === "") return;

    setSearchKeyword("");
  };

  const handleFilter = (filter) => {
    if (filter) return "text-primary border-primary";
    else return "text-darkgray border-mediumgray";
  };

  if (loading) return <Loading full={true} />;
  return (
    <div>
      <div className="text-2xl font-bold">결제 내역 확인</div>
      <TabList tabList={tabList} changeTab={changeTab} />
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
            className="block w-full p-2 pl-10 text-sm font-medium text-gray-400 border-2 rounded-full border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-30"
            placeholder="파티명 또는 닉네임 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit" className="hidden" />
        </form>
      </div>{" "}
      <div className="flex justify-end items-end">
        <div className="flex">
          <button
            className={`flex items-center justify-center bg-white text-xs rounded-lg px-4 py-3 mr-2 mb-3 border ${handleFilter(isFilterOn)}`}
            onClick={() => setIsFilterOn(!isFilterOn)}
          >
            결제 실패 건
          </button>
          <button className="relative flex items-center justify-center bg-white text-darkgray border border-mediumgray text-xs rounded-lg px-4 py-3 mb-3">
            기간 설정
            <img className="ml-2" alt="" src={img_more_info} />
          </button>
        </div>
      </div>
      {dataList &&
        dataList.map((item, index) => <Container key={index} {...item} />)}
    </div>
  );
}

export default Payment;
