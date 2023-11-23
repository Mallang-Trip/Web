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
  const imageList = [...images];
  if (!imageList[0]) imageList[0] = imageList[1];

  return (
    <div>
      <PlaceInfoTitle
        name={name}
        views={views}
        avgRate={avgRate}
        address={address}
      />
      <PartyImageBox images={imageList} name={name} />
      <PartyIconBox
        images={imageList}
        name={name}
        dibs={dibs}
        type={type}
        id={id}
      />
    </div>
  );
}

export default PlaceInfoBox;
