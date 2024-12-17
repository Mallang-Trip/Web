import { ForwardedRef, memo, useCallback, useState } from "react";
import { InputImage } from "@/components";

interface Props {
  modifyMode: boolean;
  licenseImgRef: ForwardedRef<HTMLInputElement>;
  image: string;
  name: string;
  keyValue: string;
  modifyLicenseHandler: (key: string) => void;
}

function LicensePicture({
  modifyMode,
  licenseImgRef,
  image,
  name,
  keyValue,
  modifyLicenseHandler,
}: Props) {
  const [changeImg, setChangeImg] = useState(false);

  const clickHandler = useCallback(() => {
    if (licenseImgRef && "current" in licenseImgRef && licenseImgRef.current) {
      licenseImgRef.current.click();
    }
  }, [licenseImgRef]);

  return (
    <div className="w-full">
      <div
        className="shrink-0 w-full h-full rounded-xl relative"
        onMouseEnter={() => modifyMode && setChangeImg(true)}
        onMouseLeave={() => modifyMode && setChangeImg(false)}
      >
        <img
          className="w-full h-full rounded-2xl object-cover"
          src={image}
          alt={name}
        />
        {changeImg && (
          <div
            className="absolute flex top-0 left-0 w-full h-full rounded-xl bg-black bg-opacity-50 cursor-pointer justify-center items-center"
            onClick={clickHandler}
          >
            <div className="tetext-sm text-white">{name} 변경하기</div>
          </div>
        )}
        <InputImage
          inputRef={licenseImgRef}
          className="hidden"
          id="licenseImage_Input"
          onChange={() => modifyLicenseHandler(keyValue)}
        />
      </div>
      <p className="text-center text-darkgray text-sm mt-1 font-medium">
        {name}
      </p>
    </div>
  );
}

export default memo(LicensePicture);
