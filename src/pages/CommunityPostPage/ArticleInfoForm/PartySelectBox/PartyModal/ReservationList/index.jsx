import ReservationItem from "./ReservationItem";

function ReservationList({ myReservationData, selectPartyHandler }) {
  if (myReservationData.length === 0)
    return (
      <div className="h-[430px] flex justify-center items-center">
        <p className="text-center text-black">나의 예약 내역이 비어있습니다.</p>
      </div>
    );
  return (
    <div className="w-full mt-9 h-[430px] overflow-y-auto noScrollBar">
      {myReservationData.map((item, index) => (
        <ReservationItem
          key={index}
          reservation={item}
          selectPartyHandler={selectPartyHandler}
        />
      ))}
    </div>
  );
}

export default ReservationList;
