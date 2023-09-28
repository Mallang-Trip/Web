import React from "react";
import PlaceInfoTitle from "../Atoms/PlaceInfoTitle";
import PartyBigBox from "../../PartyPage/PartyBigBox";
import BelowPlaceImg from "../BelowPlaceImg";

function PlaceInfoBox() {
  return (
    <div>
      <PlaceInfoTitle />
      <PartyBigBox />
      <BelowPlaceImg />
    </div>
  );
}

export default PlaceInfoBox;
