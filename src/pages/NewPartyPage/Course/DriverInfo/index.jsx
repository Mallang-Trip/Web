import star from "../../../../assets/svg/star.svg";

function DriverInfo({ name, reservationCount, avgRate, introduction }) {
  return (
    <>
      <div className="flex">
        <p className="text-2xl text-black font-bold">{`${name} 드라이버`}</p>
        <div className="flex gap-1 items-center ml-2 text-xs">
          <span className="whitespace-nowrap">{`예약 ${reservationCount}회`}</span>
          <span>|</span>
          <img src={star} />
          <span>{avgRate ? avgRate.toFixed(1) : "0.0"}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-black w-full h-32 mt-2.5 mb-3 py-2 px-3 text-darkgray text-sm whitespace-pre">
        {introduction}
      </div>
    </>
  );
}

export default DriverInfo;
