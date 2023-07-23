import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

function PartyResult() {
  const location = useLocation();
  console.log(location);
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between pl-5 pb-3 mx-auto overflow-hidden text-lg">
          {location.state.result}
        </div>
      </div>
    </React.Fragment>
  );
}

export default PartyResult;
