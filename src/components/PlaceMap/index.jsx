import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import SearchBox from "./Components/SearchBox";

import MapBox from "./Components/MapBox";
export default function PlaceSearchPage() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="text-2xl pt-14 pb-3">가고 싶은 여행지를 찾아요</div>
      <div className="w-full">
        <div className="relative ">
          <MapBox />
          <SearchBox />
        </div>
      </div>
    </div>
  );
}
