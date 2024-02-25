import RegionFilter from "./RegionFilter";
import DateFilter from "./DateFilter";
import PeopleFilter from "./PeopleFilter";
import PriceFilter from "./PriceFilter";

function PartyFilter({
  region,
  setRegion,
  nowDate,
  setNowDate,
  num,
  setNum,
  price,
  setPrice,
}) {
  return (
    <div className="flex justify-center gap-1 w-full px-5 lg:px-20 h-40 bg-primary rounded-tl-3xl rounded-br-3xl">
      <RegionFilter region={region} setRegion={setRegion} />
      <DateFilter nowDate={nowDate} setNowDate={setNowDate} />
      <PeopleFilter num={num} setNum={setNum} />
      <PriceFilter price={price} setPrice={setPrice} />
    </div>
  );
}

export default PartyFilter;
