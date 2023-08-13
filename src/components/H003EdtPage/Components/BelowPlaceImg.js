import React from "react";
import PlaceInfoIcon from "../Atoms/PlaceInfoIcon";
import HashTagBox from "../Atoms/HashTagBox";

function BelowPlaceImg() {
  return (
    <div className="flex gap-[550px]">
      <HashTagBox />
      <PlaceInfoIcon />
    </div>
  );
}

export default BelowPlaceImg;
