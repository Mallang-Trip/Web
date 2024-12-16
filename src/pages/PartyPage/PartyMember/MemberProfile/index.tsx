import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";
import Status from "./Status";
import basicProfileImage from "../../../../assets/images/profileImage.png";

interface Props {
  userId: number;
  profileImg: string | null;
  nickname: string;
  introduction: string | null;
  ageRange?: number;
  gender?: string;
  companions?: any[];
  myParty: boolean;
  ready: boolean;
  agreement: string;
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
  setUserId: Dispatch<SetStateAction<number>>;
}

function MemberProfile({
  userId,
  profileImg,
  nickname,
  introduction,
  ageRange,
  gender,
  companions,
  myParty,
  ready,
  agreement,
  setShowProfileModal,
  setUserId,
}: Props) {
  const companionsCount = useMemo(() => companions?.length || 0, [companions]);

  const openProfile = useCallback(() => {
    setUserId(userId);
    setShowProfileModal(true);
  }, [userId]);

  return (
    <button
      className="shrink-0 w-40 flex flex-col items-center py-5 border-[1.5px] border-mediumgray rounded-2xl relative"
      onClick={openProfile}
    >
      <img
        src={profileImg || basicProfileImage}
        alt={nickname}
        className="w-20 h-20 object-cover rounded-full"
      />
      {companionsCount > 0 && (
        <div className="w-9 h-9 flex justify-center items-center bg-[#DBF4FF] text-xs text-boldblue font-bold rounded-full absolute top-[70px] left-[92px]">
          {`+${companionsCount}명`}
        </div>
      )}
      <p className="text-base text-black font-bold my-2.5">{nickname}</p>
      <div className="h-10 text-xs text-darkgray font-medium flex flex-col gap-1.5 justify-center items-center">
        <p className="mx-2 overflow-hidden line-clamp-1 text-center">
          {introduction || "자기소개 없음"}
        </p>
        {ageRange && (
          <p>{`${ageRange}대 | ${gender === "MALE" ? "남" : "여"}`}</p>
        )}
      </div>
      {myParty && <Status ready={ready} agreement={agreement} />}
    </button>
  );
}

export default memo(MemberProfile);
