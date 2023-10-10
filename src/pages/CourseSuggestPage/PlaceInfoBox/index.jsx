import React from "react";
import PlaceInfoTitle from "../Atoms/PlaceInfoTitle";
import PartyImageBox from "../../../components/PartyImageBox";
import BelowPlaceImg from "../BelowPlaceImg";

function PlaceInfoBox() {
  return (
    <div>
      <PlaceInfoTitle />
      <PartyImageBox />
      <BelowPlaceImg />
    </div>
  );
}

export default PlaceInfoBox;
