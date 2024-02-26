import RegionFilter from "./RegionFilter";
import DateFilter from "./DateFilter";
import PeopleFilter from "./PeopleFilter";
import PriceFilter from "./PriceFilter";

function PartyFilter() {
  return (
    <div className="flex justify-center gap-1 w-full px-5 lg:px-20 h-40 bg-primary rounded-tl-3xl rounded-br-3xl">
      <RegionFilter />
      <DateFilter />
      <PeopleFilter />
      <PriceFilter />
    </div>
  );
}

export default PartyFilter;
