import Information from "../../UserProfile/Information";

function Vehicle({
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
          modifyMode={true}
          onChangeHandler={(e) =>
            setDriverInfo({ ...driverInfo, vehicleModel: e.target.value })
          }
        />
        <Information
          title={"승객 탑승 정원"}
          content={driverInfo.vehicleCapacity}
          subString={"명"}
          modifyMode={true}
          onChangeHandler={(e) =>
            setDriverInfo({
              ...driverInfo,
              vehicleCapacity: e.target.value.replace(/\D/g, ""),
            })
          }
        />
      </div>

      <div
        className="w-80 mt-5 rounded-2xl mx-auto relative"
        onMouseEnter={() => setModifyVehicleImage(true)}
        onMouseLeave={() => setModifyVehicleImage(false)}
      >
        <img
          src={
            newVehicleImage
              ? URL.createObjectURL(newVehicleImage)
              : driverInfo.vehicleImg
          }
          alt="vehicleImage"
          className="w-full h-full rounded-2xl"
        />
        {modifyVehicleImage && (
          <>
            <div
              className="absolute top-0 left-0 w-full h-full rounded-2xl flex justify-center items-center bg-black bg-opacity-50 cursor-pointer"
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
      </div>
    </>
  );
}

export default Vehicle;
