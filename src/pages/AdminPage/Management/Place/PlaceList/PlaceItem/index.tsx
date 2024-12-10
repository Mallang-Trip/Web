import { Dispatch, memo, SetStateAction, useCallback } from "react";

interface Props {
  destinationId: number;
  name: string;
  setDestinationId: Dispatch<SetStateAction<number>>;
  setShowDestinationModal: Dispatch<SetStateAction<boolean>>;
}

function PlaceItem({
  destinationId,
  name,
  setDestinationId,
  setShowDestinationModal,
}: Props) {
  const clickHandler = useCallback(() => {
    setDestinationId(destinationId);
    setShowDestinationModal(true);
  }, [destinationId]);

  return (
    <button
      className="w-full px-4 py-2.5 text-start text-sm text-gray700 font-medium border border-gray300 rounded-lg hover:border-primary cursor-pointer"
      onClick={clickHandler}
    >
      {name}
    </button>
  );
}

export default memo(PlaceItem);
