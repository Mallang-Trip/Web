import React from "react";
import LicensePicture from "./LicensePicture";

function License({
  modifyMode,
  driverInfo,
  setDriverInfo,
  licenseImgs,
  licenseImgRef,
  modifyLicenseHandler,
}) {
  return (
    <>
      <p className="text-lg font-bold w-full text-black mt-12 mb-5">
        드라이버 자격증
      </p>
      <div className="flex w-full h-48 gap-2">
        {licenseImgs.map((image, index) => (
          <LicensePicture
            key={index}
            image={image}
            modifyMode={modifyMode}
            driverInfo={driverInfo}
            setDriverInfo={setDriverInfo}
            licenseImgRef={licenseImgRef}
            modifyLicenseHandler={modifyLicenseHandler}
          />
        ))}
      </div>
    </>
  );
}

export default License;
