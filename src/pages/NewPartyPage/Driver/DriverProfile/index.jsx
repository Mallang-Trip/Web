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
      className="cursor-pointer"
      onClick={() =>
        navigation(`/driver/profile/${driverId}?member=${member}&date=${date}`)
      }
    >
      <div className="relative h-64 border rounded-lg">
        <img
          className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
          src={profileImg || basicProfileImage}
          alt={name}
        />
        <div className="absolute top-0 left-0 flex flex-col items-center justify-end w-full h-full text-base text-darkgray pb-3">
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
      <div className="mt-1 text-center text-base">{`${name} 드라이버`}</div>
    </div>
  );
}

export default DriverProfile;
