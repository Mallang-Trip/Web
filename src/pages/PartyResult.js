import React from "react";
import { useParams } from "react-router-dom";

function PartyResult() {
  const { place } = useParams();

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between pl-5 pb-3 mx-auto overflow-hidden text-lg">
          {place}
        </div>
      </div>
    </React.Fragment>
  );
}

export default PartyResult;
