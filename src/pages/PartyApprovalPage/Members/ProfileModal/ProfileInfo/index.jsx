import basicProfileImage from "../../../../../assets/images/profileImage.png";

function ProfileInfo({ profileImage, name, introduction }) {
  return (
    <div className="flex justify-center my-12 gap-5">
      <img
        src={profileImage || basicProfileImage}
        alt="profileImage"
        className="w-2/5 h-2/5"
      />
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-2xl text-black font-bold">{name}</p>
        <p className="text-sm text-primary">{introduction}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;
