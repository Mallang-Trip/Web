import Information from "../../../../../MyProfilePage/UserProfile/Information";

function Vehicle({
  vehicleModel,
  vehicleNumber,
  vehicleCapacity,
  vehicleImgs,
}) {
  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">차종</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Information
          title={"모델 명"}
          content={vehicleModel}
          modifyMode={false}
        />
        <Information
          title={"차량 번호"}
          content={vehicleNumber}
          modifyMode={false}
        />
        <Information
          title={"승객 탑승 정원"}
          content={vehicleCapacity}
          subString={"명"}
          modifyMode={false}
        />
      </div>
      <div className="h-52 mt-5 rounded-2xl relative flex gap-5 overflow-x-auto w-full noScrollBar">
        {vehicleImgs.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={vehicleModel}
            className="shrink-0 h-full rounded-2xl object-cover"
          />
        ))}
      </div>
    </>
  );
}

export default Vehicle;
