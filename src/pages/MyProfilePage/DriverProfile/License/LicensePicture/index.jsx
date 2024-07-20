import { useState } from "react";

function LicensePicture({
  modifyMode,
  licenseImgRef,
  image,
  name,
  keyValue,
  modifyLicenseHandler,
}) {
  const [changeImg, setChangeImg] = useState(false);

  return (
    <div className="w-full">
      <p className="">{name}</p>
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
          <>
            <div
              className="absolute flex top-0 left-0 w-full h-full rounded-xl bg-black bg-opacity-50 cursor-pointer justify-center items-center"
              onClick={() => licenseImgRef.current.click()}
            >
              <div className="tetext-sm text-white">면허증 사진 변경하기</div>
            </div>
            <input
              ref={licenseImgRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={() => modifyLicenseHandler(keyValue)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default LicensePicture;
