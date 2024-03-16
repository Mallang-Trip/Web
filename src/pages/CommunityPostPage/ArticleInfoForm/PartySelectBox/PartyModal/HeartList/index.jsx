import HeartItem from "./HeartItem";

function HeartList({ myHeartData, selectPartyHandler }) {
  if (myHeartData.length === 0)
    return (
      <div className="h-[430px] flex justify-center items-center">
        <p className="text-base text-center text-black">
          나의 파티 찜 목록이 비어있습니다.
        </p>
      </div>
    );
  return (
    <div className="grid gap-10 mt-9 mx-auto grid-cols-2 md:grid-cols-3 h-[430px] overflow-y-auto noScrollBar">
      {myHeartData.map((item, index) => (
        <HeartItem
          key={index}
          selectPartyHandler={selectPartyHandler}
          {...item}
        />
      ))}
    </div>
  );
}

export default HeartList;
