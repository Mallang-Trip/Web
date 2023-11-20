import Information from "../../UserProfile/Information";

function Vehicle({ modifyMode, driverInfo, setDriverInfo }) {
  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">차종</p>
      <div className="grid grid-cols-2 gap-3">
        <Information
          title={"모델 명"}
          content={driverInfo.vehicleModel}
          modifyMode={modifyMode}
          // onChangeHandler={emailHandler}
        />
        <Information
          title={"승객 탑승 정원"}
          content={`${driverInfo.vehicleCapacity}명`}
          modifyMode={modifyMode}
        />
      </div>
      <img
        src={driverInfo.vehicleImg}
        alt="taxi_image"
        className="w-80 mt-5 rounded-2xl mx-auto"
      />
    </>
  );
}

export default Vehicle;
