import { useRef } from "react";
import primaryPlus from "../../../../assets/svg/primary_plus.svg";

function ImageInput({ images, setImages }) {
  const imageRef = useRef();

  const imageUploadHandler = () => {
    const imageFile = imageRef.current.files[0];

    if (imageFile) {
      const newImages = [...images];
      newImages.push(imageFile);
      setImages(newImages);
    }
  };

  return (
    <>
      <div
        className="shrink-0 w-32 h-32 bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
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
