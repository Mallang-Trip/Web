import Information from "../../UserProfile/Information";
import ImageInput from "./ImageInput";

function Vehicle({
  modifyMode,
  driverInfo,
  setDriverInfo,
  vehicleImageRef,
  modifyVehicleImage,
  setModifyVehicleImage,
  newVehicleImage,
  vehicleImageHandler,
}) {
  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">차종</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Information
          title={"모델 명"}
          content={driverInfo.vehicleModel}
          modifyMode={modifyMode}
          onChangeHandler={(e) =>
            setDriverInfo({ ...driverInfo, vehicleModel: e.target.value })
          }
        />
        <Information
          title={"승객 탑승 정원"}
          content={driverInfo.vehicleCapacity}
          subString={"명"}
          modifyMode={modifyMode}
          onChangeHandler={(e) =>
            setDriverInfo({
              ...driverInfo,
              vehicleCapacity: e.target.value.replace(/\D/g, ""),
            })
          }
        />
      </div>
      <p className="text-lg font-bold text-black mt-12 mb-5">차량 사진</p>
      <div className="h-48 bg-cover mt-5 relative gap-[10px] flex">
        {modifyMode && <ImageInput />}
        <div
          className="w-48 h-48 rounded-xl relative"
          onMouseEnter={() => modifyMode && setModifyVehicleImage(true)}
          onMouseLeave={() => modifyMode && setModifyVehicleImage(false)}
        >
          {modifyVehicleImage && (
            <>
              <div
                className="absolute top-0 left-0 w-48 h-48 rounded-xl flex justify-center items-center bg-black bg-opacity-50 cursor-pointer"
                onClick={() => vehicleImageRef.current.click()}
              >
                <div className="whitespace-pre-line text-center text-base text-white">
                  {"차량 사진\n변경하기"}
                </div>
              </div>
              <input
                ref={vehicleImageRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={vehicleImageHandler}
              />
            </>
          )}
          {typeof driverInfo.vehicleImg === "string" ? (
            <img
              src={
                newVehicleImage
                  ? URL.createObjectURL(newVehicleImage)
                  : driverInfo.vehicleImg
              }
              alt="vehicleImage"
              className="w-48 h-48 rounded-xl hover:"
            />
          ) : (
            Array.isArray(newVehicleImage) &&
            newVehicleImage.map((image, index) => (
              <img
                key={index}
                src={
                  image
                    ? URL.createObjectURL(image)
                    : driverInfo.vehicleImgs[index]
                }
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Vehicle;
