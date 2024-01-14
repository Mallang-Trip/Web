import { useEffect, useState } from "react";
import WhatReady from "./WhatReady";
import { useSelector } from "react-redux";
import { putMallangReady } from "../../../api/party";

function MallangReady({ partyData, getPartyData }) {
  const user = useSelector((state) => state.user);
  const [ready, setReady] = useState(false);

  const readyClickHandler = async () => {
    try {
      await putMallangReady(partyData.partyId, !ready);
      setReady(!ready);
      getPartyData();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setReady(
      partyData.members.filter((item) => item.userId === user.userId)[0]?.ready
    );
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
        >
          {`말랑레디 ${ready ? "ON" : "OFF"}`}
        </button>
      </div>
      <WhatReady />
    </div>
  );
}

export default MallangReady;
