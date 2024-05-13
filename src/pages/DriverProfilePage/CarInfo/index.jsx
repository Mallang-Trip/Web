function CarInfo({ vehicleImg, vehicleModel, vehicleCapacity }) {
  return (
    <div className="flex flex-col gap-3 my-7">
      <p className="flex gap-4 items-center">
        <span className="text-lg text-black font-bold">드라이버 차량</span>
        <span className="text-sm text-darkgray font-medium">
          {vehicleModel} (승객 탑승 정원 {vehicleCapacity}명)
        </span>
      </p>
      <img src={vehicleImg} alt="dkdldhslr" className="w-80 rounded-xl" />
    </div>
  );
}

export default CarInfo;
