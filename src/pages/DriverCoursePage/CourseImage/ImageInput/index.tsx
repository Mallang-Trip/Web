import { Dispatch, memo, SetStateAction, useCallback, useRef } from "react";
import primaryPlus from "../../../../assets/svg/primary_plus.svg";
import InputImage from "../../../../components/InputImage";

interface Props {
  images: (string | File)[];
  setImages: Dispatch<SetStateAction<(string | File)[]>>;
}

function ImageInput({ images, setImages }: Props) {
  const imageRef = useRef<HTMLInputElement | null>(null);

  const imageUploadHandler = useCallback(() => {
    if (
      imageRef.current &&
      imageRef.current.files &&
      imageRef.current.files[0]
    ) {
      const imageFile = imageRef.current.files[0];
      const newImages = [...images];
      newImages.push(imageFile);
      setImages(newImages);
    }
  }, [imageRef, images]);

  return (
    <>
      <div
        className="shrink-0 w-32 h-32 bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
        onClick={() => imageRef.current?.click()}
      >
        <img src={primaryPlus} alt="plus" className="w-3 h-3" />
      </div>
      <InputImage
        inputRef={imageRef}
        className="hidden"
        id="profileImage_input"
        onChange={imageUploadHandler}
      />
    </>
  );
}

export default memo(ImageInput);
