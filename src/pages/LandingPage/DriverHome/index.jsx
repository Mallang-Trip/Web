import { useState } from "react";
import DriverTab from "./DriverTab";
import PartyList from "./PartyList";

function DriverHome() {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <DriverTab tab={tab} setTab={setTab} />
      <PartyList tab={tab} />
    </div>
  );
}

export default DriverHome;
