import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import deleteIcon from "../../../../../assets/svg/delete_image_icon.svg";

interface Props {
  modifyMode: boolean;
  image: string | File;
  index: number;
  newVehicleImages: (string | File)[];
  setNewVehicleImages: Dispatch<SetStateAction<(string | File)[]>>;
}

function VehicleImage({
  modifyMode,
  image,
  index,
  newVehicleImages,
  setNewVehicleImages,
}: Props) {
  const [showDelete, setShowDelete] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const deleteHandler = useCallback(() => {
    setNewVehicleImages(newVehicleImages.filter((_, idx) => idx !== index));
  }, [newVehicleImages, index]);

  return (
    <div
      className="w-1/4 shrink-0 h-full rounded-xl relative"
      onMouseEnter={() => modifyMode && setShowDelete(true)}
      onMouseLeave={() => modifyMode && setShowDelete(false)}
    >
      <img
        src={typeof image === "string" ? image : URL.createObjectURL(image)}
        alt={`vehicle_${index}`}
        className="w-full h-full rounded-2xl object-cover cursor-pointer"
        onClick={() => setShowImage(true)}
      />
      {showDelete && (
        <>
          <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-black bg-opacity-50 cursor-pointer">
            <img
              src={deleteIcon}
              alt="delete"
              onClick={deleteHandler}
              className="ml-auto mt-1 mr-1 w-5 h-5"
            />
          </div>
        </>
      )}
      {showImage && (
        <div
          className="fixed top-0 left-0 w-full h-full z-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
          onClick={() => setShowImage(false)}
        >
          <img
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            alt={`vehicle_${index}`}
            className="max-w-[80%] rounded-xl"
          />
        </div>
      )}
    </div>
  );
}

export default memo(VehicleImage);
