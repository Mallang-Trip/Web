import { useEffect, useState } from "react";
import { getPaymentList } from "../../../api/admin";
import Loading from "../../../components/Loading";
import TabList from "../../../components/Admin/TabList";
import Container from "./Container";
import img_more_info from "../../../assets/svg/more-info-gray500.svg";

function Payment() {
  const [loading, setLoading] = useState(true);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [current, setCurrent] = useState("reserved");
  const [dataList, setDataList] = useState();
  const tabList = [
    { name: "예약된 파티", id: "reserved" },
    { name: "취소된 파티", id: "canceled" },
    { name: "완료된 파티", id: "finished" },
  ];

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

  const changeTab = (index) => {
    if (index === 0) setCurrent("reserved");
    else if (index === 1) setCurrent("canceled");
    else setCurrent("finished");
  };

  useEffect(() => {
    getPaymentListFunc();
  }, [current]);

  if (loading) return <Loading full={true} />;
  return (
    <div>
      <div className="text-2xl font-bold">결제 내역 확인</div>
      <TabList tabList={tabList} changeTab={changeTab} />
      <div className="flex justify-end items-center gap-2 mb-4">
        <button
          className={`bg-white text-xs rounded-lg px-4 py-3 border ${isFilterOn ? "text-primary border-primary" : "text-darkgray border-mediumgray"}`}
          onClick={() => setIsFilterOn(!isFilterOn)}
        >
          결제 실패 건
        </button>
        <button className="flex items-center gap-2 bg-white text-darkgray border border-mediumgray text-xs rounded-lg px-4 py-3">
          <span>기간 설정</span>
          <img alt="기간 설정" src={img_more_info} />
        </button>
      </div>
      {dataList.map((item, index) => (
        <Container key={index} {...item} />
      ))}
      {dataList.length === 0 && (
        <div className="text-base text-black font-medium text-center mt-20">
          결제 내역이 없습니다.
        </div>
      )}
    </div>
  );
}

export default Payment;
