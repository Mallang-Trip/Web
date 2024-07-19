import PriceButton from "./PriceButton";

function PriceList({ prices, planData, setPlanData }) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <div className="flex items-center gap-1.5">
        <p className="text-lg text-black font-bold">코스 비용</p>
      </div>
      <div className="flex gap-2 my-2">
        {prices.map((item, index) => (
          <PriceButton
            key={index}
            {...item}
            planData={planData}
            setPlanData={setPlanData}
          />
        ))}
      </div>
      <p className="text-sm text-gray400">
        코스 비용은 드라이버가 운영하는 지역에 따라 책정되었으며 운행 기준
        지역이 다를 경우 파티 생성 제안이 반려될 수 있습니다.
      </p>
    </div>
  );
}

export default PriceList;
