import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DriverData } from "@/types";
import basicProfileImage from "@/assets/images/profileImage.png";

function DriverBox({ driverId, name, profileImg, region }: DriverData) {
  const navigate = useNavigate();

  const onClickHandler = useCallback(() => {
    navigate(`/driver/profile/${driverId}`);
  }, [driverId]);

  return (
    <button className="w-28 flex-shrink-0" onClick={onClickHandler}>
      <img
        className="object-cover object-center w-28 h-28 overflow-hidden rounded-full"
        src={profileImg || basicProfileImage}
        alt={name}
      />
      <div className="py-1 text-center text-sm text-darkgray font-semibold whitespace-pre-wrap">{`${name} 드라이버\n${region.length === 1 ? region : "다양한 지역"}`}</div>
    </button>
  );
}

export default memo(DriverBox);
