import { useNavigate, useParams } from "react-router-dom";
import basicProfileImage from "../../../../assets/images/profileImage.png";

function DriverProfile({
  profileImg,
  name,
  driverId,
  selectedDriverId,
  setDriverId,
  date,
  member,
  region,
}) {
  const { step } = useParams();
  const navigation = useNavigate();

  return (
    <div
      className={`relative h-64 cursor-pointer border rounded-lg hover:border-primary ${
        selectedDriverId === driverId
          ? "border-primary ring ring-primary"
          : "border-darkgray"
      }`}
      onClick={() => setDriverId(driverId)}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={profileImg || basicProfileImage}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex flex-col items-center justify-between w-full h-full p-3 text-base text-darkgray">
        <div>{name}</div>
        <button
          className="h-9 text-white rounded-full text-xs w-28 bg-primary"
          onClick={(e) => {
            e.stopPropagation();
            setDriverId(driverId);
            navigation(
              `/party/new/4?region=${region}&member=${member}&date=${date}&driverId=${driverId}`
            );
          }}
        >
          프로필 보기
        </button>
      </div>
    </div>
  );
}

export default DriverProfile;
