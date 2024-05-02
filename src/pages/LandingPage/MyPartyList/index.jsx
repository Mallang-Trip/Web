import { useState } from "react";
import UserTab from "./UserTab";
import PartyList from "./PartyList";

function MyPartyList() {
  const [tab, setTab] = useState(0);

  return (
    <div className="mt-6">
      <UserTab tab={tab} setTab={setTab} />
      <PartyList tab={tab} />
    </div>
  );
}

export default MyPartyList;
