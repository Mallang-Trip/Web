import { useSelector } from "react-redux";
import basicProfileImage from "../../../assets/images/profileImage.png";

function ProfileInfo({ profileImg, nickname, introduction, createdAt = "" }) {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex justify-center my-12 gap-6">
      <img
        src={profileImg || basicProfileImage}
        alt={nickname}
        className="w-36 h-36 rounded-full"
      />
      <div className="w-36 flex flex-col justify-center items-center text-center gap-3">
        <p className="text-2xl text-black font-bold">{nickname}</p>
        <p className="text-sm text-primary font-medium">
          {introduction || "자기소개 없음"}
        </p>
        {user.role === "ROLE_ADMIN" && (
          <p className="text-xs text-primary font-medium">
            가입일 {createdAt.replaceAll("-", ".")}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
