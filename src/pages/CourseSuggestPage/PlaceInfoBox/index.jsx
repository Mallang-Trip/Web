import React from "react";
import PlaceInfoTitle from "../Atoms/PlaceInfoTitle";
import PartyImageBox from "../../../components/PartyImageBox";
import PartyIconBox from "../../../components/PartyIconBox";

function PlaceInfoBox({ images, name, views, avgRate, address }) {
  return (
    <div>
      <PlaceInfoTitle
        name={name}
        views={views}
        avgRate={avgRate}
        address={address}
      />
      <PartyImageBox images={images} name={name} />
      <PartyIconBox images={images} name={name} />
    </div>
  );
}

export default PlaceInfoBox;
