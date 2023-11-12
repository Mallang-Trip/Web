import { useRef } from "react";

function ImageInput({ title, image, name, imageHandler }) {
  const imageRef = useRef();

  return (
    <>
      <p className="text-lg text-black">{title}</p>
      <div className="flex justify-center w-full h-[200px] my-8 relative">
        <div
          className="w-[300px] h-[200px] bg-[#EAF4FF] border border-dashed border-primary rounded-2xl cursor-pointer"
          onClick={() => imageRef.current.click()}
        >
          {image && (
            <img
              className="object-cover w-full h-full rounded-2xl"
              src={URL.createObjectURL(image)}
              alt={name}
            />
          )}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 md:translate-x-[200px] md:translate-y-0">
          <label htmlFor={name}>
            <button
              className="px-5 py-1 text-sm bg-white border rounded-full border-darkgray text-darkgray"
              onClick={() => imageRef.current.click()}
            >
              사진 업로드
            </button>
          </label>
          <input
            ref={imageRef}
            className="hidden"
            id={name}
            type="file"
            accept="image/*"
            onChange={() => imageHandler(name)}
          />
        </div>
      </div>
    </>
  );
}

export default ImageInput;
