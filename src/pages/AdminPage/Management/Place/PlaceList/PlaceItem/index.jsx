function PlaceItem({
  destinationId,
  name,
  setDestinationId,
  setShowDestinationModal,
}) {
  return (
    <button
      className="w-full px-4 py-2.5 text-start text-sm text-gray700 font-medium border border-gray300 rounded-lg hover:border-primary cursor-pointer"
      onClick={() => {
        setDestinationId(destinationId);
        setShowDestinationModal(true);
      }}
    >
      {name}
    </button>
  );
}

export default PlaceItem;
