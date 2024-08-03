import ReservationItem from "./ReservationItem";

function ReservationList({ myReservationData, selectPartyHandler }) {
  if (myReservationData.length === 0)
    return (
      <div className="h-[430px] flex justify-center items-center">
        <p className="text-center text-black">
          나의 파티 예약 내역이 비어있습니다.
        </p>
      </div>
    );
  return (
    <div className="w-full mt-9 h-[430px] custom-scrollbar">
      {myReservationData.map((item) => (
        <ReservationItem
          key={item.partyId}
          selectPartyHandler={selectPartyHandler}
          {...item}
        />
      ))}
    </div>
  );
}

export default ReservationList;
