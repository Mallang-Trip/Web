import Information from "../../../../../MyProfilePage/UserProfile/Information";

function Vehicle({ vehicleModel, vehicleCapacity, vehicleImg }) {
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
          title={"승객 탑승 정원"}
          content={vehicleCapacity}
          subString={"명"}
          modifyMode={false}
        />
      </div>
      <div className="w-80 h-52 mt-5 rounded-2xl mx-auto relative">
        <img
          src={vehicleImg}
          alt={vehicleModel}
          className="w-full h-full rounded-2xl object-cover"
        />
      </div>
    </>
  );
}

export default Vehicle;
