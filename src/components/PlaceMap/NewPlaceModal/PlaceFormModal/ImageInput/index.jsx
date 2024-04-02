import { useRef } from "react";
import primaryPlus from "../../../../../assets/svg/primary_plus.svg";

function ImageInput({ newPlaceInfo, setNewPlaceInfo }) {
  const imageRef = useRef();

  const imageUploadHandler = () => {
    const imageFile = imageRef.current.files[0];

    if (imageFile) {
      const newImage = [...newPlaceInfo.images];
      newImage.push(imageFile);
      setNewPlaceInfo({ ...newPlaceInfo, images: newImage });
    }
  };

  return (
    <>
      <div
        className="shrink-0 w-20 h-20 bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
        onClick={() => imageRef.current.click()}
      >
        <img src={primaryPlus} alt="plus" className="w-3 h-3" />
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
