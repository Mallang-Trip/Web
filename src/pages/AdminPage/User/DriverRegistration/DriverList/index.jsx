import DriverItem from "./DriverItem";

function DriverList({ waitingDriverData, setDriverInfo }) {
  if (waitingDriverData.length === 0)
    return (
      <div className="text-base text-black font-medium mt-20 text-center">
        드라이버 등록 심사 대기건이 없습니다.
      </div>
    );
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        {waitingDriverData.map((driver) => (
          <DriverItem
            key={driver.driverId}
            driver={driver}
            setDriverInfo={setDriverInfo}
          />
        ))}
      </div>
    </>
  );
}

export default DriverList;