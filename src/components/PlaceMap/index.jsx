import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import SearchBox from "./Components/SearchBox";
import RoundBtn from "./Common/RoundBtn";
import ZimBtn from "./Components/ZimBtn";
import MapBox from "./Components/MapBox";
export default function PlaceSearchPage() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="text-2xl pt-14 pb-3">가고 싶은 여행지를 찾아요</div>
      <div className="w-full">
        <div className="relative ">
          <MapBox />
          <div className="inline-grid grid-cols-1 md:gird-rows-2 md:grid ">
            <div className="absolute top-0 left-0 w-full flex justify-center">
              <SearchBox />
            </div>
            <div className="absolute top-0 right-0 mt-4 md:mr-52">
              <RoundBtn name="새로운 장소 추가" />
            </div>
          </div>
          <div className="absolute bottom-0 right-1/2 mb-8">
            <RoundBtn name="여행지 상세 보기" />
          </div>
          <div className="absolute bottom-0 right-1/4 mb-8 ">
            <ZimBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
