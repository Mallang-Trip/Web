import RegionFilter from "./RegionFilter";
import DateFilter from "./DateFilter";
import PeopleFilter from "./PeopleFilter";
import PriceFilter from "./PriceFilter";

function PartyFilter() {
  return (
    <div className="w-full h-28 flex bg-white rounded-3xl border border-gray300 shadow-md">
      <RegionFilter />
      <DateFilter />
      <PeopleFilter />
      <PriceFilter />
    </div>
  );
}

export default PartyFilter;
