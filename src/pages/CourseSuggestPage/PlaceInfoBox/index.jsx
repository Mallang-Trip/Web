import React from "react";
import PlaceInfoTitle from "../Atoms/PlaceInfoTitle";
import PartyImageBox from "../../../components/PartyImageBox";
import BelowPlaceImg from "../BelowPlaceImg";

function PlaceInfoBox({ images, name }) {
  return (
    <div>
      <PlaceInfoTitle />
      <PartyImageBox images={images} name={name} />
      <BelowPlaceImg />
    </div>
  );
}

export default PlaceInfoBox;
