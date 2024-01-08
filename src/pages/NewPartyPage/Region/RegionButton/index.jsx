import { useNavigate } from "react-router-dom";

function RegionButton({ name, image, setRegion, member, driverId, date }) {
  const navigation = useNavigate();

  return (
    <div
      className="relative h-64 cursor-pointer"
      onClick={() => {
        setRegion(name);
        navigation(
          `/party/new/2?region=${name}&member=${member}&date=${date}&driverId=${driverId}`
        );
      }}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl text-white">
        {name}
      </div>
    </div>
  );
}

export default RegionButton;
