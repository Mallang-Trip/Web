import { memo } from "react";
import { Place } from "../../../types";
import PlaceInfoTitle from "./PlaceInfoTitle";
import ImageBox from "../../../components/ImageBox";
import PartyIconBox from "../../../components/PartyIconBox";

interface Props extends Place {
  id: number;
  type: "party" | "destination";
  images: string[];
}

function PlaceInfoBox({
  id,
  type,
  images,
  name,
  views,
  avgRate,
  address,
  dibs,
}: Props) {
  return (
    <div>
      <PlaceInfoTitle
        name={name}
        views={views}
        avgRate={avgRate}
        address={address}
      />
      <ImageBox images={images} name={name} />
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

export default memo(PlaceInfoBox);
