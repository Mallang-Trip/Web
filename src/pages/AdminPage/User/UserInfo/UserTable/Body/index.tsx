import { Dispatch, memo, SetStateAction } from "react";
import { makePhoneNumber } from "@/utils";

interface Props {
  userId: number;
  userNickname: string;
  loginId: string;
  suspensionDuration: number;
  name: string;
  phoneNumber: string;
  createdAt: string;
  setProfileId: Dispatch<SetStateAction<number>>;
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
  setShowRegionModal: Dispatch<SetStateAction<boolean>>;
}

function Body({
  userId,
  userNickname,
  loginId,
  suspensionDuration,
  name,
  phoneNumber,
  createdAt,
  setProfileId,
  setShowProfileModal,
  setShowRegionModal,
}: Props) {
  return (
    <div className="w-full py-3 grid grid-cols-7 items-center text-center bg-white border border-gray300 rounded-xl">
      <p className="px-1 text-gray700 font-medium">{userNickname}</p>
      <p className="px-1 text-gray700 font-medium">
        <span>{loginId}</span>
        {suspensionDuration !== 0 && (
          <span className="pl-2 ml-2 border-l border-gray500 text-[#ff0000] font-bold">
            {suspensionDuration === -1 ? "영구" : suspensionDuration + "일"}
          </span>
        )}
      </p>
      <p className="px-1 text-gray700 font-medium">{name}</p>
      <p className="px-1 text-gray700 font-medium">
        {makePhoneNumber(phoneNumber)}
      </p>
      <p className="px-1 text-gray500 font-medium">
        {createdAt.slice(0, 10).replaceAll("-", ".")}
      </p>
      <button
        className="px-1 text-gray500 font-medium hover:font-semibold"
        onClick={() => {
          setProfileId(userId);
          setShowProfileModal(true);
        }}
      >
        프로필
      </button>
      <button
        className="px-1 text-primary font-medium hover:font-semibold"
        onClick={() => {
          setProfileId(userId);
          setShowRegionModal(true);
        }}
      >
        승격
      </button>
    </div>
  );
}

export default memo(Body);
