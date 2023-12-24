import basicProfileImage from "../../../assets/images/profileImage.png";

function ProfileInfo({ profileImg, nickname, introduction }) {
  return (
    <div className="flex justify-center my-12 gap-8">
      <img
        src={profileImg || basicProfileImage}
        alt={nickname}
        className="w-40 h-40 rounded-full"
      />
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-2xl text-black font-bold">{nickname}</p>
        <p className="text-sm text-primary">{introduction}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;
