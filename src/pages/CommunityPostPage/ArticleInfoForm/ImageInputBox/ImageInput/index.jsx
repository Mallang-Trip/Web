import { useRef, useState } from "react";
import primaryPlus from "../../../../../assets/svg/primary_plus.svg";
import deleteIcon from "../../../../../assets/svg/delete_image_icon.svg";

function ImageInput({ images, setImages, index }) {
  const imageRef = useRef();
  const [deleteMode, setDeleteMode] = useState(false);

  const imageUploadHandler = () => {
    const imageFile = imageRef.current.files[0];
    const newImages = [...images];
    newImages[index] = imageFile || undefined;
    setImages(newImages);
  };

  const imageDeleteHandler = (e) => {
    e.stopPropagation();
    const newImages = [...images];
    newImages[index] = undefined;
    setImages(newImages);
  };

  return (
    <>
      <div
        className="w-20 h-20 bg-[#EAF4FF] border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
        onClick={() => imageRef.current.click()}
      >
        {images[index] ? (
          <div
            className="w-full h-full rounded-lg relative"
            onMouseEnter={() => setDeleteMode(true)}
            onMouseLeave={() => setDeleteMode(false)}
          >
            <img
              src={
                typeof images[index] === "string"
                  ? images[index]
                  : URL.createObjectURL(images[index])
              }
              alt="Article_Image"
              className="object-cover w-full h-full rounded-lg"
            />
            {deleteMode && (
              <div
                className="absolute top-0 left-0 w-full h-full rounded-lg bg-black bg-opacity-50 cursor-pointer z-10"
                onClick={(e) => imageDeleteHandler(e)}
              >
                <img
                  src={deleteIcon}
                  alt="delete"
                  className="ml-auto mt-1 mr-1"
                />
              </div>
            )}
          </div>
        ) : (
          <img src={primaryPlus} alt="plus" className="w-3 h-3" />
        )}
      </div>
      <input
        ref={imageRef}
        className="hidden"
        id="profileImage_input"
        type="file"
        accept="image/*"
        onChange={imageUploadHandler}
      />
    </>
  );
}

export default ImageInput;