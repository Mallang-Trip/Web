function ReservationButton({ joinHander }) {
  return (
    <div className="flex justify-center my-20">
      <button
        className="h-14 text-white rounded-full text-lg font-bold w-64 md:w-80 bg-primary"
        onClick={joinHander}
      >
        파티 가입하기
      </button>
    </div>
  );
}

export default ReservationButton;
