import { ForwardedRef, memo, useCallback } from "react";
import primaryPlus from "../../../../../assets/svg/primary_plus.svg";
import InputImage from "../../../../../components/InputImage";

interface Props {
  vehicleImageRef: ForwardedRef<HTMLInputElement>;
  vehicleImageHandler: () => void;
}

function ImageInput({ vehicleImageRef, vehicleImageHandler }: Props) {
  const clickHandler = useCallback(() => {
    if (
      vehicleImageRef &&
      "current" in vehicleImageRef &&
      vehicleImageRef.current
    ) {
      vehicleImageRef.current.click();
    }
  }, [vehicleImageRef]);

  return (
    <div
      className="shrink-0 w-48 h-full bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
      onClick={clickHandler}
    >
      <img src={primaryPlus} alt="plus" className="w-4 h-4" />
      <InputImage
        id="carImage_upload"
        inputRef={vehicleImageRef}
        className="hidden"
        onChange={vehicleImageHandler}
      />
    </div>
  );
}

export default memo(ImageInput);
