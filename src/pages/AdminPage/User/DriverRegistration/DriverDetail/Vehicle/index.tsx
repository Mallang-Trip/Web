import { memo } from "react";
import Information from "@/pages/MyProfilePage/UserProfile/Information";

interface Props {
  vehicleModel: string;
  vehicleNumber: string;
  vehicleCapacity: number;
  vehicleImgs: string[];
}

function Vehicle({
  vehicleModel,
  vehicleNumber,
  vehicleCapacity,
  vehicleImgs,
}: Props) {
  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">차종</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Information
          title="모델 명"
          content={vehicleModel}
          modifyMode={false}
        />
        <Information
          title="차량 번호"
          content={vehicleNumber}
          modifyMode={false}
        />
        <Information
          title="승객 탑승 정원"
          content={vehicleCapacity.toString()}
          subString="명"
          modifyMode={false}
        />
      </div>
      <div className="h-52 mt-5 rounded-2xl relative flex gap-5 w-full custom-scrollbar">
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

export default memo(Vehicle);
