import { useState } from "react";
import deleteIcon from "../../../../../assets/svg/delete_image_icon.svg";

function VehicleImage({
  modifyMode,
  image,
  index,
  newVehicleImages,
  setNewVehicleImages,
}) {
  const [showDelete, setShowDelete] = useState(false);

  const deleteHandler = () => {
    setNewVehicleImages(newVehicleImages.filter((_, idx) => idx !== index));
  };

  return (
    <div
      className="shrink-0 h-full rounded-xl relative"
      onMouseEnter={() => modifyMode && setShowDelete(true)}
      onMouseLeave={() => modifyMode && setShowDelete(false)}
    >
      <img
        src={typeof image === "string" ? image : URL.createObjectURL(image)}
        alt={`vehicle_${index}`}
        className="w-full h-full rounded-2xl object-cover"
      />
      {showDelete && (
        <>
          <div
            className="absolute top-0 left-0 w-full h-full rounded-xl bg-black bg-opacity-50 cursor-pointer"
            onClick={deleteHandler}
          >
            <img
              src={deleteIcon}
              alt="delete"
              className="ml-auto mt-1 mr-1 w-5 h-5"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default VehicleImage;
