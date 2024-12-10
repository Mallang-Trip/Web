import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { getPaymentList } from "../../../api/admin";
import { partyStatusObj } from "../../../utils/data";
import Loading from "../../../components/Loading";
import TabList from "../../../components/TabList";
import Title from "../../../components/Title";
import Party from "./Party";
import MallangTalkModal from "./MallangTalkModal";
import ReceiptModal from "./ReceiptModal";

export interface ReceiptInfo {
  driverName: string;
  driverPenaltyAmount: number | null;
  driverPenaltyStatus: string;
  driverProfileImg: string;
  status: keyof typeof partyStatusObj;
  partyId: number;
  partyMembers: {
    userId: number;
    nickname: string;
    profileImg: string;
    reservationStatus: string;
    receiptUrl: string;
  }[];
}

export interface MallangTalkInfo {
  partyName: string;
  partyPrivateChatRoomId: number;
  partyPublicChatRoomId: number;
}

interface PartyType extends MallangTalkInfo, ReceiptInfo {
  startDate: string;
  capacity: number;
  headcount: number;
}

function Payment() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState("reserved");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dataList, setDataList] = useState<PartyType[]>([]);
  const [mallangTalkInfo, setMallangTalkInfo] = useState<MallangTalkInfo>({
    partyName: "",
    partyPrivateChatRoomId: 0,
    partyPublicChatRoomId: 0,
  });
  const [receiptInfo, setReceiptInfo] = useState<ReceiptInfo>({
    driverName: "",
    driverPenaltyAmount: null,
    driverPenaltyStatus: "",
    driverProfileImg: "",
    partyMembers: [],
    status: "RECRUITING",
    partyId: 0,
  });
  const [showMallangTalkModal, setShowMallangTalkModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const tabList = useMemo(
    () => [
      { name: "예약된 파티", id: "reserved" },
      { name: "취소된 파티", id: "canceled" },
      { name: "완료된 파티", id: "finished" },
    ],
    []
  );

  const getPaymentListFunc = useCallback(async () => {
    try {
      const result = await getPaymentList(current);
      setDataList(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [current]);

  const changeTab = useCallback((current: number) => {
    if (current === 0) setCurrent("reserved");
    else if (current === 1) setCurrent("canceled");
    else setCurrent("finished");
  }, []);

  useEffect(() => {
    getPaymentListFunc();
  }, [current]);

  useEffect(() => {
    const currentItem = localStorage.getItem("payment_current");
    if (!currentItem) return;
    setCurrent(currentItem);
    setCurrentIdx(tabList.findIndex((item) => item.id === currentItem));
    localStorage.removeItem("payment_current");
  }, []);

  if (loading) return <Loading full={true} />;
  return (
    <div>
      <Title title="결제 내역 확인" />
      <TabList tabList={tabList} changeTab={changeTab} index={currentIdx} />
      {dataList.map((party) => (
        <Party
          key={party.partyId}
          setMallangTalkInfo={setMallangTalkInfo}
          setShowMallangTalkModal={setShowMallangTalkModal}
          setReceiptInfo={setReceiptInfo}
          setShowReceiptModal={setShowReceiptModal}
          current={current}
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

export default memo(Payment);
