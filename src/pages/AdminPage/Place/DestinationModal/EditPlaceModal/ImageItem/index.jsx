import { useState } from "react";
import deleteIcon from "../../../../../../assets/svg/delete_image_icon.svg";

function ImageItem({ image, index, newPlaceInfo, setNewPlaceInfo }) {
  const [deleteMode, setDeleteMode] = useState(false);

  const imageDeleteHandler = () => {
    const newImage = [...newPlaceInfo.images];
    newImage.splice(index, 1);
    setNewPlaceInfo({ ...newPlaceInfo, images: newImage });
  };

  return (
    <div className="shrink-0 w-20 h-20 bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center">
      <div
        className="w-full h-full rounded-lg relative"
        onMouseEnter={() => setDeleteMode(true)}
        onMouseLeave={() => setDeleteMode(false)}
      >
        <img
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          alt="place_image"
          className="object-cover w-full h-full rounded-lg"
        />
        {deleteMode && (
          <div
            className="absolute top-0 left-0 w-full h-full rounded-lg bg-black bg-opacity-50 cursor-pointer z-10"
            onClick={imageDeleteHandler}
          >
            <img src={deleteIcon} alt="delete" className="ml-auto mt-1 mr-1" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageItem;