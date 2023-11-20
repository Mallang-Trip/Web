import PriceInfo from "./PriceInfo";

function Price({ modifyMode, driverInfo, setDriverInfo }) {
  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">가격 설정</p>
      <div className="grid grid-cols-2 gap-3">
        {driverInfo.prices.map((price) => (
          <PriceInfo
            key={price.hours + price.price}
            content={`${price.hours}시간당 ${price.price}원`}
            modifyMode={modifyMode}
          />
        ))}
      </div>
    </>
  );
}

export default Price;
