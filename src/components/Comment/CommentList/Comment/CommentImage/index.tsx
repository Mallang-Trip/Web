import { ForwardedRef, memo, useCallback, useState } from "react";
import { InputImage } from "@/components";

interface Props {
  modifyMode: boolean;
  image: string | File;
  commentImageRef: ForwardedRef<HTMLInputElement>;
  modifyImageHandler: () => void;
}

function CommentImage({
  modifyMode,
  image,
  commentImageRef,
  modifyImageHandler,
}: Props) {
  const [imageChange, setImageChange] = useState(false);

  const handleImageClick = useCallback(() => {
    if (
      commentImageRef &&
      "current" in commentImageRef &&
      commentImageRef.current
    ) {
      commentImageRef.current.click();
    }
  }, [commentImageRef]);

  return (
    <div
      onMouseEnter={() => modifyMode && setImageChange(true)}
      onMouseLeave={() => modifyMode && setImageChange(false)}
    >
      <img
        src={typeof image === "string" ? image : URL.createObjectURL(image)}
        className="w-52 rounded-xl"
      />
      {imageChange && (
        <div
          className="absolute flex justify-center place-items-center top-0 left-0 w-52 h-full rounded-xl bg-black bg-opacity-50 cursor-pointer"
          onClick={handleImageClick}
        >
          <div className="whitespace-pre-line text-sm text-white">
            이미지 변경하기
          </div>
        </div>
      )}
      <InputImage
        inputRef={commentImageRef}
        className="hidden"
        id="commentImage_input"
        onChange={modifyImageHandler}
      />
    </div>
  );
}

export default memo(CommentImage);
