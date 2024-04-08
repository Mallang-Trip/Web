import ImageInput from "./ImageInput";
import ImageItem from "./ImageItem";

function CourseImage({ images, setImages }) {
  return (
    <div className="flex flex-col gap-2 my-8">
      <p className="text-lg text-black font-bold">파티 코스 이미지</p>
      <div className="flex gap-4 overflow-x-auto noScrollBar">
        {images.map((image, index) => (
          <ImageItem
            image={image}
            images={images}
            setImages={setImages}
            index={index}
            key={index}
          />
        ))}
        <ImageInput images={images} setImages={setImages} />
      </div>
    </div>
  );
}

export default CourseImage;
