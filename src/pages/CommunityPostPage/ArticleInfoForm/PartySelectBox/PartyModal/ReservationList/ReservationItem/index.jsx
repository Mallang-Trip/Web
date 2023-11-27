function ReservationItem({ reservation, selectPartyHandler }) {
  if (!reservation) return null;
  else
    return (
      <div
        className="w-full relative h-64 mb-5 cursor-pointer rounded-lg"
        onClick={() => selectPartyHandler(reservation.name)}
      >
        <img
          className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
          src={reservation.image}
          alt="reservation-image"
        />
        <div className="z-10 bg-black bg-opacity-30 w-full h-full flex justify-center items-center rounded-lg absolute top-0 left-0">
          <div className="text-center text-white flex flex-col gap-1.5">
            <p className="text-xl font-bold">{reservation.name}</p>
            <p className="text-sm">{`${reservation.date
              .slice(5)
              .replace("-", "/")} | ${reservation.headcount}/${
              reservation.capacity
            }명 | ${reservation.price / 10000}만원 | ${
              reservation.driverName
            } 드라이버`}</p>
          </div>
        </div>
      </div>
    );
}

export default ReservationItem;
