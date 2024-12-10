import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  driverId: number;
  userNickname: string;
  loginId: string;
  suspensionDuration: number;
  createdAt: string;
  setDriverId: Dispatch<SetStateAction<number>>;
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
}

function DriverItem({
  driverId,
  userNickname,
  loginId,
  suspensionDuration,
  createdAt,
  setDriverId,
  setShowProfileModal,
}: Props) {
  const navigation = useNavigate();

  const openProfile = useCallback(() => {
    setDriverId(driverId);
    setShowProfileModal(true);
  }, [driverId]);

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 font-medium border border-gray300 rounded-lg hover:border-primary">
      <div className="flex items-center text-sm">
        <span className="text-gray700 pr-2 mr-2 border-r border-gray500">
          {userNickname}
        </span>
        <span className="text-gray700">{loginId}</span>
        {suspensionDuration !== 0 && (
          <span className="text-[#ff0000] font-bold pl-2 ml-2 border-l border-gray500">
            {suspensionDuration === -1 ? "영구" : `${suspensionDuration}일`}
          </span>
        )}
      </div>
      <div className="flex items-center text-xs">
        <button
          className="text-gray500 hover:font-semibold"
          onClick={() => navigation(`/driver/profile/${driverId}`)}
        >
          드라이버 프로필
        </button>
        <span className="text-gray500 px-2 mx-2 border-x border-gray500">
          {createdAt.slice(0, 10).replaceAll("-", ".")}
        </span>
        <button
          className="text-gray500 hover:font-semibold"
          onClick={openProfile}
        >
          프로필
        </button>
      </div>
    </div>
  );
}

export default memo(DriverItem);
