import basicProfileImage from "../../../../assets/images/profileImage.png";

function MemberProfile({ profileImg, nickname, ageRange, gender, myParty }) {
  return (
    <div className="shrink-0 w-40 flex flex-col items-center py-5 border-[1.5px] border-[#D9D9D9] rounded-2xl">
      <img
        src={profileImg || basicProfileImage}
        alt={nickname}
        className="w-20 h-20 rounded-full"
      />
      <p className="text-base text-black font-bold my-2.5">{nickname}</p>
      <div className="h-7 text-[10px] leading-[10px] text-darkgray font-medium flex flex-col gap-1.5 justify-center items-center">
        <p className="mx-2 overflow-hidden line-clamp-1 text-center">
          안녕하세요 행복한 사람이에요!
        </p>
        {ageRange && (
          <p>{`${ageRange}대 | ${gender === "MALE" ? "남" : "여"}`}</p>
        )}
      </div>
      {myParty && (
        <div className="mt-2.5 py-2 px-4 rounded-full text-xs font-medium text-[#B4B4B4] bg-[#F4F4F4]">
          말랑레디 OFF
        </div>
      )}
    </div>
  );
}

export default MemberProfile;
