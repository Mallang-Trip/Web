import Information from "../../UserProfile/Information";
import ImageInput from "./ImageInput";
import VehicleImage from "./VehicleImage";

function Vehicle({
  modifyMode,
  driverInfo,
  setDriverInfo,
  vehicleImageRef,
  newVehicleImages,
  vehicleImageHandler,
  setNewVehicleImages,
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
          title={"차량 번호"}
          content={driverInfo.vehicleNumber}
          modifyMode={modifyMode}
          onChangeHandler={(e) =>
            setDriverInfo({ ...driverInfo, vehicleNumber: e.target.value })
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
      <div className="h-48 bg-cover mt-5 relative gap-[10px] flex custom-scrollbar">
        {modifyMode && (
          <ImageInput
            vehicleImageRef={vehicleImageRef}
            vehicleImageHandler={vehicleImageHandler}
          />
        )}
        {newVehicleImages.map((image, index) => (
          <VehicleImage
            key={`vehicleImage_${index}`}
            image={image}
            index={index}
            modifyMode={modifyMode}
            newVehicleImages={newVehicleImages}
            setNewVehicleImages={setNewVehicleImages}
          />
        ))}
      </div>
    </>
  );
}

export default Vehicle;
