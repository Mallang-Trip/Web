import { Dispatch, memo, SetStateAction, useCallback, useRef } from "react";
import { NewPlace } from "../..";
import { InputImage } from "@/components";
import primaryPlus from "@/assets/svg/primary_plus.svg";

interface Props {
  newPlaceInfo: NewPlace;
  setNewPlaceInfo: Dispatch<SetStateAction<NewPlace>>;
}

function ImageInput({ newPlaceInfo, setNewPlaceInfo }: Props) {
  const imageRef = useRef<HTMLInputElement | null>(null);

  const imageUploadHandler = useCallback(() => {
    if (
      imageRef.current &&
      imageRef.current.files &&
      imageRef.current.files[0]
    ) {
      const imageFile = imageRef.current.files[0];
      const newImage = [...newPlaceInfo.images];
      newImage.push(imageFile);
      setNewPlaceInfo({ ...newPlaceInfo, images: newImage });
    }
  }, [imageRef, newPlaceInfo]);

  return (
    <>
      <div
        className="shrink-0 w-20 h-20 bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
        onClick={() => imageRef.current?.click()}
      >
        <img src={primaryPlus} alt="plus" className="w-3 h-3" />
      </div>
      <InputImage
        inputRef={imageRef}
        className="hidden"
        id="placeImage_input"
        onChange={imageUploadHandler}
      />
    </>
  );
}

export default memo(ImageInput);
