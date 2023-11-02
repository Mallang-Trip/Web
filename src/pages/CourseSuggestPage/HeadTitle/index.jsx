import { useNavigate } from "react-router-dom";
import Vector from "../../../assets/images/Vector.png";

function HeadTitle({ name, driverName, driverId }) {
  const navigation = useNavigate();

  return (
    <>
      <div className="text-2xl text-black">{name}</div>
      <div
        className="text-sm text-darkgray cursor-pointer"
        onClick={() => navigation(`/driver/profile/${driverId}`)}
      >
        <span>{`${driverName} 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
      </div>
    </>
  );
}

export default HeadTitle;
