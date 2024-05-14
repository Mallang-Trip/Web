import { useNavigate } from "react-router-dom";
import basicProfileImage from "../../../../assets/images/profileImage.png";

function DriverProfile({
  profileImg,
  name,
  driverId,
  setDriverId,
  member,
  date,
}) {
  const navigation = useNavigate();

  return (
    <div
      className="cursor-pointer bg-skyblue rounded-lg hover:ring ring-primary/50"
      onClick={(e) => {
        e.stopPropagation();
        setDriverId(driverId);
      }}
    >
      <div className="relative h-64 border rounded-lg">
        <img
          className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
          src={profileImg || basicProfileImage}
          alt={name}
        />
        <div className="absolute top-0 left-0 flex flex-col items-center justify-end w-full h-full text-base text-darkgray pb-3">
          <button
            className="h-9 text-white rounded-full text-xs font-bold w-32 bg-primary"
            onClick={() =>
              navigation(
                `/driver/profile/${driverId}?member=${member}&date=${date}`
              )
            }
          >
            프로필
          </button>
        </div>
      </div>
      <div className="py-1 text-center text-lg text-primary font-semibold">{`${name} 드라이버`}</div>
    </div>
  );
}

export default DriverProfile;
