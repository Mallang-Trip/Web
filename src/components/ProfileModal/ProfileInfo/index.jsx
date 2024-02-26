import basicProfileImage from "../../../assets/images/profileImage.png";

function ProfileInfo({ profileImg, nickname, introduction }) {
  return (
    <div className="flex justify-center my-12 gap-8">
      <img
        src={profileImg || basicProfileImage}
        alt={nickname}
        className="w-40 h-40 rounded-full"
      />
      <div className="w-28 flex flex-col justify-center items-center text-center gap-3">
        <p className="text-2xl text-black font-bold">{nickname}</p>
        <p className="text-sm text-primary font-medium">
          {introduction || "자기소개 없음"}
        </p>
      </div>
    </div>
  );
}

export default ProfileInfo;
