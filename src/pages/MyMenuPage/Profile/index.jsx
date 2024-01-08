import { useSelector } from "react-redux";
import mallangTripIcon from "../../../assets/images/intro_icon.png";

function Profile() {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex items-center gap-4 border border-primary p-3 rounded-lg">
      <img
        src={user.profileImg}
        alt={user.nickname}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex flex-col justify-between">
        <p className="text-lg text-gray-900 font-bold">{user.nickname}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <img src={mallangTripIcon} alt="말랑트립" className="h-12 ml-auto" />
    </div>
  );
}

export default Profile;
