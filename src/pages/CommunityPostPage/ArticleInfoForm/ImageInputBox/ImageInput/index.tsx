import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { InputImage } from "@/components";
import primaryPlus from "@/assets/svg/primary_plus.svg";
import deleteIcon from "@/assets/svg/delete_image_icon.svg";

interface Props {
  images: (string | File | undefined)[];
  setImages: Dispatch<SetStateAction<(string | File | undefined)[]>>;
  index: number;
}

function ImageInput({ images, setImages, index }: Props) {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);

  const imageUploadHandler = useCallback(() => {
    if (imageRef.current && imageRef.current.files) {
      const imageFile = imageRef.current.files[0];
      const newImages = [...images];
      newImages[index] = imageFile || undefined;
      setImages(newImages);
    }
  }, [imageRef, images, index]);

  const imageDeleteHandler = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      const newImages = [...images];
      newImages[index] = undefined;
      setImages(newImages);
    },
    [images, index]
  );

  const image = useMemo(() => images[index], [images, index]);

  const imagesSrc = useMemo(
    () =>
      typeof image === "string"
        ? image
        : image instanceof File
          ? URL.createObjectURL(image)
          : undefined,
    [image]
  );

  return (
    <>
      <div
        className="w-20 h-20 bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
        onClick={() => imageRef.current?.click()}
      >
        {imagesSrc ? (
          <div
            className="w-full h-full rounded-lg relative"
            onMouseEnter={() => setDeleteMode(true)}
            onMouseLeave={() => setDeleteMode(false)}
          >
            <img
              src={imagesSrc}
              alt="Article_Image"
              className="object-cover w-full h-full rounded-lg"
            />
            {deleteMode && (
              <div
                className="absolute top-0 left-0 w-full h-full rounded-lg bg-black bg-opacity-50 cursor-pointer z-10"
                onClick={imageDeleteHandler}
              >
                <img
                  src={deleteIcon}
                  alt="delete"
                  className="ml-auto mt-1 mr-1"
                />
              </div>
            )}
          </div>
        ) : (
          <img src={primaryPlus} alt="plus" className="w-3 h-3" />
        )}
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
