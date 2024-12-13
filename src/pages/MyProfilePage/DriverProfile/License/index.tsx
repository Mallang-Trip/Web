import { ForwardedRef, memo } from "react";
import LicensePicture from "./LicensePicture";

interface Props {
  modifyMode: boolean;
  licenseImgs: { value: string; name: string; key: string }[];
  licenseImgRef: ForwardedRef<HTMLInputElement>;
  modifyLicenseHandler: (key: string) => void;
}

function License({
  modifyMode,
  licenseImgs,
  licenseImgRef,
  modifyLicenseHandler,
}: Props) {
  return (
    <>
      <p className="text-lg font-bold w-full text-black mt-12 mb-5">
        드라이버 자격증
      </p>
      <div className="flex w-full h-48 gap-2">
        {licenseImgs.map((licenseImg, index) => (
          <LicensePicture
            key={index}
            image={licenseImg.value}
            name={licenseImg.name}
            keyValue={licenseImg.key}
            modifyMode={modifyMode}
            licenseImgRef={licenseImgRef}
            modifyLicenseHandler={modifyLicenseHandler}
          />
        ))}{" "}
      </div>
    </>
  );
}

export default memo(License);
