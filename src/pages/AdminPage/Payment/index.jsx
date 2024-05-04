import { useEffect, useState } from "react";
import { getPaymentList } from "../../../api/admin";
import Loading from "../../../components/Loading";
import TabList from "../../../components/Admin/TabList";
import Title from "../../../components/Title";
import Party from "./Party";
import MallangTalkModal from "./MallangTalkModal";
import ReceiptModal from "./ReceiptModal";

function Payment() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState("reserved");
  const [dataList, setDataList] = useState([]);
  const [mallangTalkInfo, setMallangTalkInfo] = useState({});
  const [showMallangTalkModal, setShowMallangTalkModal] = useState(false);
  const [receiptInfo, setReceiptInfo] = useState({
    driverName: "",
    driverPenaltyAmount: null,
    driverPenaltyStatus: "",
    partyMembers: [],
  });
  const [showReceiptModal, setShowReceiptModal] = useState(false);
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
      <Title title="결제 내역 확인" />
      <TabList tabList={tabList} changeTab={changeTab} />
      {dataList.map((party) => (
        <Party
          key={party.partyId}
          setMallangTalkInfo={setMallangTalkInfo}
          setShowMallangTalkModal={setShowMallangTalkModal}
          setReceiptInfo={setReceiptInfo}
          setShowReceiptModal={setShowReceiptModal}
          {...party}
        />
      ))}
      {dataList.length === 0 && (
        <div className="text-base text-black font-medium text-center mt-20">
          결제 내역이 없습니다.
        </div>
      )}
      <MallangTalkModal
        showModal={showMallangTalkModal}
        setShowModal={setShowMallangTalkModal}
        mallangTalkInfo={mallangTalkInfo}
      />
      <ReceiptModal
        showModal={showReceiptModal}
        setShowModal={setShowReceiptModal}
        receiptInfo={receiptInfo}
        setReceiptInfo={setReceiptInfo}
        getPaymentListFunc={getPaymentListFunc}
      />
    </div>
  );
}

export default Payment;
