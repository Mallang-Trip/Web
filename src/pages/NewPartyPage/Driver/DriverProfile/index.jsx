import { useNavigate, useParams } from "react-router-dom";

function DriverProfile({
  profileImg,
  name,
  driverId,
  selectedDriverId,
  setDriverId,
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
        src={profileImg}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex flex-col items-center justify-between w-full h-full p-3 text-base text-darkgray">
        <div>{name}</div>
        <button
          className="h-8 text-white rounded-full text-xs w-24 bg-primary"
          onClick={(e) => {
            e.stopPropagation();
            navigation(`/party/new/${Number(step) + 1}`);
          }}
        >
          프로필 보기
        </button>
      </div>
    </div>
  );
}

export default DriverProfile;
