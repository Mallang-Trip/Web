import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import deleteIcon from "@/assets/svg/delete_image_icon.svg";

interface Props {
  image: string;
  index: number;
  carImages: string[] | null;
  setCarImages: Dispatch<SetStateAction<string[] | null>>;
}

function CarImage({ image, index, carImages, setCarImages }: Props) {
  const [showDelete, setShowDelete] = useState(false);

  const deleteHandler = useCallback(() => {
    if (carImages) {
      setCarImages(carImages.filter((_, idx) => idx !== index));
    }
  }, [carImages, index]);

  return (
    <div
      className="w-[300px] h-full relative"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <img
        key={index}
        className="w-full h-full rounded-2xl object-cover cursor-pointer relative"
        src={image}
        alt={`car_image_${index}`}
      />
      {showDelete && (
        <div
          className="absolute top-0 left-0 w-full h-full rounded-xl bg-black bg-opacity-50 cursor-pointer"
          onClick={deleteHandler}
        >
          <img
            src={deleteIcon}
            className="ml-auto mt-1 mr-1 w-5 h-5"
            alt="delete"
          />
        </div>
      )}
    </div>
  );
}

export default memo(CarImage);
