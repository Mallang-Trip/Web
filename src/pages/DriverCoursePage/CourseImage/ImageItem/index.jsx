import { useState } from "react";
import deleteIcon from "../../../../assets/svg/delete_image_icon.svg";

function ImageItem({ image, index, images, setImages }) {
  const [deleteMode, setDeleteMode] = useState(false);

  const imageDeleteHandler = () => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="shrink-0 w-32 h-32 bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center">
      <div
        className="w-full h-full rounded-lg relative"
        onMouseEnter={() => setDeleteMode(true)}
        onMouseLeave={() => setDeleteMode(false)}
      >
        <img
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          alt="party_image"
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
