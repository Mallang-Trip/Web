import React from "react";
import PlaceInfoTitle from "../Atoms/PlaceInfoTitle";
import PartyImageBox from "../../../components/PartyImageBox";
import PartyIconBox from "../../../components/PartyIconBox";

function PlaceInfoBox({
  id,
  type,
  images,
  name,
  views,
  avgRate,
  address,
  dibs,
}) {
  return (
    <div>
      <PlaceInfoTitle
        name={name}
        views={views}
        avgRate={avgRate}
        address={address}
      />
      <PartyImageBox images={images} name={name} />
      <PartyIconBox
        images={images}
        name={name}
        dibs={dibs}
        type={type}
        id={id}
      />
    </div>
  );
}

export default PlaceInfoBox;
