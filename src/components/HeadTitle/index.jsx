import { useNavigate } from "react-router-dom";
import Vector from "../../../src/assets/svg/Vector.svg";

function HeadTitle({ name, driverName, driverId, isDriver }) {
  const navigation = useNavigate();

  return (
    <>
      <div className="text-2xl font-bold text-black">{name}</div>
      {isDriver === true && (
        <div
          className="text-sm text-darkgray cursor-pointer flex gap-1 items-center"
          onClick={() => navigation(`/driver/profile/${driverId}`)}
        >
          <span>{`${driverName} 드라이버`}</span>
          <img src={Vector} alt={driverName} />
        </div>
      )}
    </>
  );
}

export default HeadTitle;
