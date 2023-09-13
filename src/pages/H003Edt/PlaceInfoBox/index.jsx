import React from "react";
import PlaceInfoTitle from "../Atoms/PlaceInfoTitle";
import PartyBigBox from "../../PartyResult/PartyBigBox";
import BelowPlaceImg from "../BelowPlaceImg";

function PlaceInfoBox() {
  return (
    <div className="">
      <PlaceInfoTitle />
      <PartyBigBox />
      <BelowPlaceImg />
    </div>
  );
}

export default PlaceInfoBox;
