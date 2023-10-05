import React from "react";
import PlaceInfoIcon from "../Atoms/PlaceInfoIcon";
import HashTagBox from "../Atoms/HashTagBox";

function BelowPlaceImg() {
  return (
    <div className="flex my-3 justify-between">
      <HashTagBox />
      <PlaceInfoIcon />
    </div>
  );
}

export default BelowPlaceImg;
