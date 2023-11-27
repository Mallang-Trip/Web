import { useNavigate } from "react-router-dom";
import Vector from "../../../src/assets/images/Vector.png";

function HeadTitle({ name, driverName, driverId, isDriver }) {
  const navigation = useNavigate();

  return (
    <>
      <div className="text-2xl font-bold text-black">{name}</div>
      {isDriver === true && (
        <span
          className="text-sm text-darkgray cursor-pointer"
          onClick={() => navigation(`/driver/profile/${driverId}`)}
        >
          <span>{`${driverName} 드라이버`}</span>
          <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
        </span>
      )}
    </>
  );
}

export default HeadTitle;
