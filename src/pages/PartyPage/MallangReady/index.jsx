import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { putMallangReady } from "../../../api/party";
import { computeGapDay } from "../../../utils";
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
  const [ready, setReady] = useState(false);

  const readyClickHandler = async () => {
    try {
      await putMallangReady(partyId, !ready);
      setReady(!ready);
      getPartyData();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user.role === "ROLE_DRIVER") setReady(driverReady);
    else
      setReady(members.filter((item) => item.userId === user.userId)[0]?.ready);
  }, []);

  return (
    <div className="my-7">
      <p className="text-lg text-black font-bold">말랑레디</p>
      <div className="my-2.5 flex justify-center sm:justify-start sm:ml-48 items-center">
        <button
          className={`w-44 py-3 text-lg font-bold border rounded-full ${
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
    </div>
  );
}

export default MallangReady;
