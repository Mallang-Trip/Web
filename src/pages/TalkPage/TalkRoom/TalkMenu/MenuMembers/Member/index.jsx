import { useSelector } from "react-redux";
import basicProfileImage from "../../../../../../assets/images/profileImage.png";

function Member({
  userId,
  profileImg,
  nickname,
  introduction,
  setShowProfileModal,
  setProfileUserId,
  type,
  setKickUser,
  setShowKickModal,
}) {
  const user = useSelector((state) => state.user);
  const publicRoomId = useSelector((state) => state.talkRoom.publicRoomId);

  const showProfileHandler = () => {
    setProfileUserId(userId);
    setShowProfileModal(true);
  };

  const kickHandler = async (e) => {
    e.stopPropagation();

    setKickUser({
      userId: userId,
      nickname: nickname,
    });
    setShowKickModal(true);
  };

  return (
    <button
      className="w-full my-1 p-2 flex items-center hover:bg-lightgray rounded-lg focus:outline-none"
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
      {type === "PARTY_PUBLIC" && publicRoomId && userId !== user.userId && (
        <div
          className="w-16 bg-[#FFEAEA] text-[#E30000] py-1.5 px-2 text-xs rounded-lg border border-[#E30000] focus:outline-none"
          onClick={kickHandler}
        >
          강퇴
        </div>
      )}
    </button>
  );
}

export default Member;
