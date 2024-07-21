import { useState } from "react";
function CommentImage({
  modifyMode,
  image,
  commentImageRef,
  modifyImageHandler,
}) {
  const [imageChange, setImageChange] = useState(false);

  return (
    <div
      onMouseEnter={() => modifyMode && setImageChange(true)}
      onMouseLeave={() => modifyMode && setImageChange(false)}
    >
      <img
        src={typeof image === "string" ? image : URL.createObjectURL(image)}
        className="w-28 h-32"
      />
      {imageChange && (
        <>
          <div
            className="absolute flex justify-center place-items-center top-0 left-0 w-28 h-full rounded-xl bg-black bg-opacity-50 cursor-pointer"
            onClick={() => commentImageRef.current.click()}
          >
            <div className="whitespace-pre-line text-sm text-white">
              {"이미지 변경하기"}
            </div>
          </div>
          <input
            ref={commentImageRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={modifyImageHandler}
          />
        </>
      )}
    </div>
  );
}

export default CommentImage;
