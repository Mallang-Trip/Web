import { Dispatch, memo, SetStateAction } from "react";
import { Destination } from "../../../../../types";
import PlaceItem from "./PlaceItem";

interface Props {
  placeData: Destination[];
  setDestinationId: Dispatch<SetStateAction<number>>;
  setShowDestinationModal: Dispatch<SetStateAction<boolean>>;
}

function PlaceList({
  placeData,
  setDestinationId,
  setShowDestinationModal,
}: Props) {
  if (placeData.length === 0)
    return <div className="text-center mt-40">여행지 데이터가 없습니다.</div>;
  return (
    <div className="w-full flex flex-col gap-2">
      {placeData.map((destination) => (
        <PlaceItem
          key={destination.destinationId}
          setDestinationId={setDestinationId}
          setShowDestinationModal={setShowDestinationModal}
          {...destination}
        />
      ))}
    </div>
  );
}

export default memo(PlaceList);
