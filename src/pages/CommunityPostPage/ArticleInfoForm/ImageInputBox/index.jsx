import ImageInput from "./ImageInput";

function ImageInputBox({ showImageInput, images, setImages }) {
  return (
    <div
      className={`flex gap-4 mb-10 overflow-hidden transition-all duration-500 ${
        showImageInput ? "max-h-[100px]" : "max-h-0"
      }`}
    >
      {Array.from({ length: 3 }, (_, index) => index).map((i) => (
        <ImageInput images={images} setImages={setImages} index={i} key={i} />
      ))}
    </div>
  );
}

export default ImageInputBox;
