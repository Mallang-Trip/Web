import basicProfileImage from "../../../../../../../../assets/images/profileImage.png";

function Member({
  userId,
  profileImg,
  nickname,
  introduction,
  inviteMember,
  setInviteMember,
}) {
  const isSelected = () =>
    inviteMember.some((member) => member.userId === userId);

  const clickHandler = () => {
    if (isSelected()) return;
    setInviteMember([
      ...inviteMember,
      { userId: userId, nickName: nickname, profileImg: profileImg },
    ]);
  };

  return (
    <button
      className={`w-full p-2 flex items-center hover:bg-lightgray rounded-lg border focus:outline-none ${
        isSelected() ? "bg-lightgray border-primary" : "bg-white border-white"
      }`}
      onClick={clickHandler}
    >
      <img
        className="mr-3 w-10 h-10 rounded-full object-cover shrink-0"
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
