import basicProfileImage from "../../../../assets/images/profileImage.png";

function ProfileInfo({ profileImg, nickname, introduction, createdAt }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("ko-KR", options)
      .replace(/\./g, "")
      .split(" ")
      .join(".");
  };
  return (
    <div className="flex justify-center mt-8 mb-20 gap-8">
      <img
        src={profileImg || basicProfileImage}
        alt={nickname}
        className="w-40 h-40 rounded-full"
      />
      <div className=" flex flex-col justify-center items-center text-center gap-3">
        <p className="text-2xl text-black font-bold">{nickname}</p>
        <p className="text-sm text-primary font-medium">
          {introduction || "자기소개 없음"}
        </p>
        <p className="w-full flex flex-row text-sm text-primary font-medium">
          가입일 {formatDate(createdAt)}
        </p>
      </div>
    </div>
  );
}

export default ProfileInfo;
