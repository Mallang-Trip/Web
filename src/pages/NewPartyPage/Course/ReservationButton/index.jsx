function ReservationButton({ clickHander }) {
  return (
    <div className="flex justify-center mt-20">
      <button
        className="mx-auto h-12 text-white rounded-full text-lg w-64 md:w-80 bg-primary"
        onClick={clickHander}
      >
        예약하기
      </button>
    </div>
  );
}

export default ReservationButton;
