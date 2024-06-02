import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { putMallangReady } from "../../../api/party";
import { computeGapDay } from "../../../utils";
import Loading from "../../../components/Loading";
import CheckModal from "../../../components/CheckModal";
import WhatReady from "./WhatReady";

function MallangReady({
  members,
  driverReady,
  getPartyData,
  partyStatus,
  startDate,
}) {
  const user = useSelector((state) => state.user);
  const { partyId } = useParams();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);

  const readyClickHandler = async () => {
    try {
      if (isLast && !ready) {
        setShowCheckModal(true);
      } else {
        if (isLast) setLoading(true);
        await putMallangReady(partyId, !ready);
        setReady(!ready);
        getPartyData();
      }
    } catch (e) {
      console.log(e);
    } finally {
      if (partyStatus !== "RECRUITING") setLoading(false);
    }
  };

  useEffect(() => {
    if (user.role === "ROLE_DRIVER")
      setReady(
        driverReady ||
          partyStatus === "SEALED" ||
          partyStatus === "WAITING_COURSE_CHANGE_APPROVAL"
      );
    else
      setReady(
        members.filter((item) => item.userId === user.userId)[0]?.ready ||
          partyStatus === "SEALED" ||
          partyStatus === "WAITING_COURSE_CHANGE_APPROVAL"
      );
    const readyMembers = members.filter((member) => member.ready);
    if (readyMembers.length === members.length - 1 && !ready) {
      setIsLast(true);
    }
  }, []);

  if (loading) return <Loading full={true} />;
  if (computeGapDay(startDate) <= 0 && partyStatus !== "RECRUITING")
    return null;
  return (
    <div className="my-7">
      <p className="text-lg text-black font-bold">말랑레디</p>
      <div className="my-2.5 flex justify-center sm:justify-start sm:ml-40 items-center">
        <button
          className={`w-40 py-3 ml-2.5 text-base font-bold border rounded-full ${
            ready
              ? "bg-primary text-white border-primary"
              : "bg-white text-darkgray border-darkgray"
          }`}
          onClick={readyClickHandler}
          disabled={partyStatus !== "RECRUITING"}
        >
          {partyStatus === "RECRUITING"
            ? `말랑레디 ${ready ? "ON" : "OFF"}`
            : computeGapDay(startDate) > 2
              ? "말랑트립 확정"
              : "말랑트립 최종 확정"}
        </button>
      </div>
      <WhatReady />
      <CheckModal
        showModal={showCheckModal}
        setShowModal={setShowCheckModal}
        message={`말랑레디를 누르시겠습니까?\n\n누르는 순간 예약이 확정되며\n결제가 즉시 진행됩니다`}
        noText="아니오"
        yesText="예"
        yesHandler={() => {
          setReady(!ready);
          readyClickHandler();
        }}
      />
    </div>
  );
}

export default MallangReady;
