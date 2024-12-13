import { Dispatch, memo, MouseEvent, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { isGAlive } from "../../../../utils/ga";
import ReactGA from "react-ga4";
import basicProfileImage from "../../../../assets/images/profileImage.png";

interface Props {
  profileImg: string | undefined;
  name: string;
  driverId: number;
  setDriverId: Dispatch<SetStateAction<number | string>>;
  member: number;
  date: string;
  region: string;
}

function DriverProfile({
  profileImg,
  name,
  driverId,
  setDriverId,
  member,
  date,
  region,
}: Props) {
  const navigation = useNavigate();

  const selectDriver = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setDriverId(driverId);
    },
    [driverId]
  );

  const showDriverProfile = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (isGAlive()) {
        ReactGA.event({
          category: "새로운 파티 만들기",
          action: `07_selectdriver_${name}`,
        });
      }

      navigation(
        `/driver/profile/${driverId}?region=${region}&member=${member}&date=${date}`
      );
    },
    [name, driverId, region, member, date]
  );

  return (
    <div
      className="cursor-pointer bg-skyblue rounded-lg hover:ring ring-primary/50"
      onClick={selectDriver}
    >
      <div className="relative h-64 border rounded-lg">
        <img
          className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
          src={profileImg || basicProfileImage}
          alt={name}
        />
        <div className="absolute top-0 left-0 flex flex-col items-center justify-end w-full h-full text-base text-darkgray pb-3">
          <button
            className="h-9 text-white rounded-full text-xs font-bold w-32 bg-primary"
            onClick={showDriverProfile}
          >
            프로필
          </button>
        </div>
      </div>
      <div className="py-1 text-center text-lg text-primary font-semibold">{`${name} 드라이버`}</div>
    </div>
  );
}

export default memo(DriverProfile);
