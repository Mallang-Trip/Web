import { memo } from "react";
import star from "@/assets/svg/star.svg";
import basicProfileImage from "@/assets/images/profileImage.png";

interface Props {
  name: string;
  reservationCount: number;
  avgRate: number | null;
  introduction: string;
  profileImg: string | null;
}

function DriverInfo({
  name,
  reservationCount,
  avgRate,
  introduction,
  profileImg,
}: Props) {
  return (
    <>
      <div className="flex items-center gap-2">
        <img
          src={profileImg || basicProfileImage}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-2xl text-black font-bold">{`${name} 드라이버`}</p>
        <div className="flex gap-1 items-center text-xs">
          <span className="whitespace-nowrap">{`예약 ${reservationCount}회`}</span>
          <span>|</span>
          <img src={star} alt="평점" />
          <span>{avgRate ? avgRate.toFixed(1) : "0.0"}</span>
        </div>
      </div>
      <div className="rounded-2xl border-2 border-primary w-full h-32 mt-2.5 mb-3 py-2 px-3">
        <p className="w-full h-full text-darkgray text-sm font-medium whitespace-pre custom-scrollbar">
          {introduction}
        </p>
      </div>
    </>
  );
}

export default memo(DriverInfo);
