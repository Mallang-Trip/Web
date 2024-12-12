import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import deleteIcon from "../../../../assets/svg/delete_image_icon.svg";

interface Props {
  image: string | File;
  index: number;
  images: (string | File)[];
  setImages: Dispatch<SetStateAction<(string | File)[]>>;
}

function ImageItem({ image, index, images, setImages }: Props) {
  const [deleteMode, setDeleteMode] = useState(false);

  const imageDeleteHandler = useCallback(() => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }, [images, index]);

  return (
    <div className="shrink-0 w-32 h-32 bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center">
      <div
        className="w-full h-full rounded-lg relative"
        onMouseEnter={() => setDeleteMode(true)}
        onMouseLeave={() => setDeleteMode(false)}
      >
        <img
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          alt="party_image"
          className="object-cover w-full h-full rounded-lg"
        />
        {deleteMode && (
          <div
            className="absolute top-0 left-0 w-full h-full rounded-lg bg-black bg-opacity-50 cursor-pointer z-10"
            onClick={imageDeleteHandler}
          >
            <img src={deleteIcon} alt="delete" className="ml-auto mt-1 mr-1" />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ImageItem);
