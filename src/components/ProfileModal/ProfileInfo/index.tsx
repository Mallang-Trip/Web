import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import basicProfileImage from "../../../assets/images/profileImage.png";

interface Props {
  profileImg: string | undefined;
  nickname: string | undefined;
  introduction: string | undefined;
  createdAt: string | undefined;
  driverName: string | boolean;
}

function ProfileInfo({
  profileImg,
  nickname,
  introduction,
  createdAt,
  driverName,
}: Props) {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex justify-center my-12 gap-6">
      <img
        src={profileImg || basicProfileImage}
        alt={nickname}
        className="w-36 h-36 rounded-full object-cover"
      />
      <div className="w-40 flex flex-col justify-center items-center text-center gap-3">
        <p className="text-2xl text-black font-bold whitespace-nowrap">
          {driverName || nickname}
        </p>
        <p className="text-sm text-primary font-medium">
          {introduction || "자기소개 없음"}
        </p>
        {user.role === "ROLE_ADMIN" && (
          <p className="text-xs text-primary font-medium">
            가입일 {createdAt ? createdAt.replaceAll("-", ".") : "없음"}
          </p>
        )}
      </div>
    </div>
  );
}

export default memo(ProfileInfo);
