import { useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";

function ProfileHeader({ modifyMode, modifyProfileHandler }) {
  const user = useSelector((state) => state.user);

  return (
    <div className="my-6 relative h-12">
      <div className="text-2xl md:text-3xl font-bold text-black absolute top-0 left-1/2 transform -translate-x-1/2">
        {user.nickname}
      </div>
      <EditButton
        className="absolute top-12 md:top-0 right-0"
        onClick={modifyProfileHandler}
        title={modifyMode ? "저장" : "프로필 수정"}
      />
    </div>
  );
}

export default ProfileHeader;