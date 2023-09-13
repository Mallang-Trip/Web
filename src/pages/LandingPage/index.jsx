import React from "react";
import Pictures from "./Pictures";

function LandingPage() {
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between pl-5 pb-3 mx-auto overflow-hidden text-lg">
          가고싶은 여행지를 찾아요
        </div>
        <Pictures />
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
