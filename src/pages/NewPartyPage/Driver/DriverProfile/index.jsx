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
      className="relative h-64 border rounded-lg cursor-pointer"
      onClick={() =>
        navigation(`/driver/profile/${driverId}?member=${member}&date=${date}`)
      }
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={profileImg || basicProfileImage}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex flex-col items-center justify-between w-full h-full text-base text-darkgray pb-3">
        <div className="py-2 w-full text-center text-white bg-black bg-opacity-50 rounded-t-lg">
          {name}
        </div>
        <button
          className="h-9 text-white rounded-full text-xs w-32 bg-primary"
          onClick={(e) => {
            e.stopPropagation();
            setDriverId(driverId);
          }}
        >
          선택하기
        </button>
      </div>
    </div>
  );
}

export default DriverProfile;
