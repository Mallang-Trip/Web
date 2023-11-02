import star from "../../../../assets/svg/star.svg";

function DriverInfo({ name, reservationCount, avgRate, introduction }) {
  return (
    <>
      <div className="mb-1 pt-6 flex">
        <p className="text-2xl font-bold">{`${name} 드라이버`}</p>
        <div className="flex gap-1 m-2 mt-3 text-xs">
          <span>{`예약 ${reservationCount}회`}</span>
          <span>|</span>
          <img className="mb-1" src={star} />
          <span>{avgRate || 0.0}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-black w-full h-32 p-2 text-darkgray text-sm">
        {introduction}
      </div>
    </>
  );
}

export default DriverInfo;
