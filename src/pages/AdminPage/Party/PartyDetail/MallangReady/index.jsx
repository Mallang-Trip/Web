import { useEffect, useState } from "react";
import { getPartyDriverReady } from "../../../../../api/admin";
import { computeGapDay } from "../../../../../utils";
import WhatReady from "./WhatReady";

function MallangReady({
  partyId,
  driverReady,
  partyStatus,
  startDate,
  getPartyDetailFunc,
}) {
  const [ready, setReady] = useState(false);

  const readyClickHandler = async () => {
    try {
      await getPartyDriverReady(partyId, !ready);
      setReady(!ready);
      getPartyDetailFunc();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setReady(
      driverReady ||
        partyStatus === "SEALED" ||
        partyStatus === "WAITING_COURSE_CHANGE_APPROVAL" ||
        partyStatus === "FINISHED"
    );
  }, []);

  return (
    <div className="my-7">
      <p className="text-lg text-black font-bold">말랑레디</p>
      <div className="my-2.5 flex justify-center sm:justify-start sm:ml-48 items-center">
        <button
          className={`w-48 py-4 text-sm font-bold rounded-full ${
            ready ? "bg-primary text-white" : "bg-lightgray text-darkgray"
          }`}
          onClick={readyClickHandler}
          disabled={partyStatus !== "RECRUITING"}
        >
          {partyStatus === "RECRUITING"
            ? `드라이버 말랑레디 ${ready ? "ON" : "OFF"}`
            : computeGapDay(startDate) > 2
              ? "말랑트립 확정"
              : "말랑트립 최종 확정"}
        </button>
      </div>
      <WhatReady />
    </div>
  );
}

export default MallangReady;
