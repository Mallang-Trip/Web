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
    <div className="cursor-pointer bg-skyblue rounded-lg h-64">
      <div className="relative h-[220px] border rounded-lg">
        <img
          className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
          src={profileImg || basicProfileImage}
          alt={name}
        />
        <div className="absolute top-0 left-0 flex flex-col items-center justify-end w-full h-full text-base text-darkgray pb-3">
          <button
            className="h-9 text-white rounded-full text-xs font-bold w-32 bg-primary"
            onClick={onClickHandler}
          >
            프로필
          </button>
        </div>
      </div>
      <div className="py-1 text-center text-lg text-primary font-semibold">{`${region.length === 1 ? region : "다양한 지역"} ${name} 드라이버`}</div>
    </div>
  );
}

export default memo(DriverBox);
