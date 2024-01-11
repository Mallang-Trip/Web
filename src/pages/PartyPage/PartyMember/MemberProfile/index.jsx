import basicProfileImage from "../../../../assets/images/profileImage.png";

function MemberProfile({
  userId,
  profileImg,
  nickname,
  introduction,
  ageRange,
  gender,
  companions = [],
  myParty,
  setShowProfileModal,
  setUserId,
}) {
  const companionsCount = companions.length;

  return (
    <button
      className="shrink-0 w-40 flex flex-col items-center py-5 border-[1.5px] border-[#D9D9D9] rounded-2xl relative"
      onClick={() => {
        setUserId(userId);
        setShowProfileModal(true);
      }}
    >
      <img
        src={profileImg || basicProfileImage}
        alt={nickname}
        className="w-20 h-20 rounded-full"
      />
      {companionsCount > 0 && (
        <div className="w-9 h-9 flex justify-center items-center bg-[#DBF4FF] text-xs text-[#1F6A95] font-bold rounded-full absolute top-[70px] left-[92px]">
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
      {myParty && (
        <div className="mt-3 py-1.5 px-4 rounded-full text-xs font-medium text-[#B4B4B4] bg-[#F4F4F4]">
          말랑레디 OFF
        </div>
      )}
    </button>
  );
}

export default MemberProfile;
