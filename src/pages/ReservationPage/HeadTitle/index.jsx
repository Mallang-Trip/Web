import Vector from "../../../assets/images/Vector.png";
import { dateToStringHan } from "../../../utils";

function HeadTitle({ name, driverName, driverId, startDate, endDate }) {
  return (
    <>
      <div className="text-2xl text-black font-bold mb-2">예약하기</div>
      <div className="text-2xl text-black">{name}</div>
      <div
        className="text-sm text-darkgray cursor-pointer"
        onClick={() => console.log(driverId)}
      >
        <span>{`${driverName} 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
      </div>
      <div className="text-sm text-darkgray mt-1">{`${dateToStringHan(
        startDate
      )} ~ ${dateToStringHan(endDate)}`}</div>
    </>
  );
}

export default HeadTitle;
