import { useNavigate } from "react-router-dom";

function RegionButton({
  region,
  regionImg,
  setRegion,
  member,
  driverId,
  date,
}) {
  const navigation = useNavigate();

  return (
    <div
      className="relative h-64 cursor-pointer"
      onClick={() => {
        setRegion(region);
        navigation(
          `/party/new/2?region=${region}&member=${member}&date=${date}&driverId=${driverId}`
        );
      }}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={regionImg}
        alt={region}
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl text-white z-10">
        {region}
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 rounded-lg" />
    </div>
  );
}

export default RegionButton;
