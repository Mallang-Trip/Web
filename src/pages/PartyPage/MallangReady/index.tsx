import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { putMallangReady } from "@/api/party";
import { computeGapDay } from "@/utils";
import { Loading, CheckModal } from "@/components";
import WhatReady from "./WhatReady";
import clsx from "clsx";

interface Props {
  members: {
    ageRange: number;
    companions: any;
    gender: string;
    headcount: number;
    introduction: string;
    nickname: string;
    profileImg: string | null;
    ready: boolean;
    userId: number;
  }[];
  driverReady: boolean;
  getPartyData: (toScrollTop?: boolean) => void;
  partyStatus: string;
  startDate: string;
}

function MallangReady({
  members,
  driverReady,
  getPartyData,
  partyStatus,
  startDate,
}: Props) {
  const user = useSelector((state: RootState) => state.user);
  const { partyId } = useParams();
  const [ready, setReady] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const readyClickHandler = useCallback(async () => {
    if (!partyId) return;
    try {
      await putMallangReady(partyId, !ready);
      setReady(!ready);
      getPartyData();
      setShowCheckModal(false);
    } catch (e) {
      console.log(e);
      alert("말랑레디 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [partyId, ready]);

  useEffect(() => {
    if (!loading) return;
    readyClickHandler();
  }, [loading]);

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
  }, []);

  if (computeGapDay(startDate) <= 0 && partyStatus !== "RECRUITING")
    return null;
  return (
    <div className="my-7">
      <p className="text-lg text-black font-bold">말랑레디</p>
      <div className="my-2.5 flex justify-center sm:justify-start sm:ml-40 items-center">
        <button
          className={clsx(
            "w-40 py-3 ml-2.5 text-base font-bold border rounded-full",
            ready
              ? "bg-primary text-white border-primary"
              : "bg-white text-darkgray border-darkgray"
          )}
          onClick={() => setShowCheckModal(true)}
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
        message={
          !showCheckModal || loading ? (
            <Loading full={false} />
          ) : ready ? (
            "말랑레디를 취소하시겠습니까?"
          ) : (
            "말랑레디를 누르시겠습니까?\n\n모든 인원이 레디를 누르면\n예약이 확정되며 즉시 결제됩니다."
          )
        }
        noText="아니오"
        yesText="예"
        yesHandler={() => setLoading(true)}
      />
    </div>
  );
}

export default memo(MallangReady);
