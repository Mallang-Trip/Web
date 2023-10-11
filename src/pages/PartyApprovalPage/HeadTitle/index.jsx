import Vector from "../../../assets/images/Vector.png";

function HeadTitle({ name, driverName, driverId }) {
  return (
    <div className="mb-3">
      <div>
        <span className="text-2xl text-black font-bold">
          파티원 확인 대기 중
        </span>
        <span className="ml-2 mt-1 text-sm text-darkgray">
          {`${name} | 승인 대기 중`}
        </span>
      </div>
      <div
        className="text-sm text-darkgray cursor-pointer"
        onClick={() => console.log(driverId)}
      >
        <span>{`${driverName} 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
      </div>
    </div>
  );
}

export default HeadTitle;
