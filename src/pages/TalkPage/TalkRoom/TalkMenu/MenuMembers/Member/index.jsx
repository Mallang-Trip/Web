import basicProfileImage from "../../../../../../assets/images/profileImage.png";

function Member({
  userId,
  profileImg,
  nickname,
  introduction,
  setShowProfileModal,
  setProfileUserId,
}) {
  const showProfileHandler = () => {
    setProfileUserId(userId);
    setShowProfileModal(true);
  };

  return (
    <button
      className="w-full my-1 p-2 flex items-center hover:bg-[#F4F4F4] rounded-lg focus:outline-none"
      onClick={showProfileHandler}
    >
      <img
        className="mr-3 w-10 h-10 rounded-full"
        src={profileImg || basicProfileImage}
        alt="Profile_Image"
      />
      <div className="w-full h-full flex flex-col gap-0.5 text-left">
        <p className="w-full text-sm text-black font-bold">{nickname}</p>
        <p className="w-full text-xs text-darkgray font-medium overflow-hidden line-clamp-1">
          {introduction}
        </p>
      </div>
    </button>
  );
}

export default Member;
