import { Dispatch, memo, SetStateAction } from "react";
import ImageInput from "./ImageInput";
import clsx from "clsx";

interface Props {
  showImageInput: boolean;
  images: (string | File | undefined)[];
  setImages: Dispatch<SetStateAction<(string | File | undefined)[]>>;
}

function ImageInputBox({ showImageInput, images, setImages }: Props) {
  return (
    <div
      className={clsx(
        "flex gap-4 overflow-hidden transition-all duration-500",
        showImageInput ? "max-h-[100px]" : "max-h-0"
      )}
    >
      {Array.from({ length: 3 }, (_, index) => index).map((i) => (
        <ImageInput images={images} setImages={setImages} index={i} key={i} />
      ))}
    </div>
  );
}

export default memo(ImageInputBox);
