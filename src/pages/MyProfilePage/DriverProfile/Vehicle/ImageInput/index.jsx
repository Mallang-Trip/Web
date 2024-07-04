import primaryPlus from "../../../../../assets/svg/primary_plus.svg";
import { CONSTANT } from "../../../../../utils/data";
import { useRef } from "react";
function ImageInput({ images, setImages }) {
  const imageRef = useRef();
  const imageUploadHandler = () => {
    const imageFile = imageRef.current.files[0];
    if (imageFile.size > CONSTANT.MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    // const newImages = [...images];
    // newImages[index] = imageFile || undefined;
    setImages(images);
  };
  return (
    <>
      <div
        className="w-48 bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
        onClick={() => imageRef.current.click()}
      >
        <img src={primaryPlus} alt="plus" className="w-4 h-4" />
      </div>
      <input
        ref={imageRef}
        className="hidden"
        id="carImage_upload"
        type="file"
        accept="image/*"
        onChange={imageUploadHandler}
      />
    </>
  );
}

export default ImageInput;
