import Vector from "../../../assets/images/Vector.png";

function HeadTitle({ name, driverName, driverId }) {
  return (
    <>
      <div className="text-2xl text-black">{name}</div>
      <span
        className="text-sm text-darkgray cursor-pointer"
        onClick={() => console.log(driverId)}
      >
        <span>{`${driverName} 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
      </span>
    </>
  );
}

export default HeadTitle;
