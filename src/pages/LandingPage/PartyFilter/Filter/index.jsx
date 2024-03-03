import RegionFilter from "./RegionFilter";
import DateFilter from "./DateFilter";
import PeopleFilter from "./PeopleFilter";
import PriceFilter from "./PriceFilter";
import RegionMobileFilter from "./RegionMobileFilter";
import DateMobileFilter from "./DateMobileFilter";
import PeopleMobileFilter from "./PeopleMobileFilter";
import PriceMobileFilter from "./PriceMobileFilter";

function Filter({
  setShowRegionModal,
  setShowDateModal,
  setShowPeopleModal,
  setShowPriceModal,
}) {
  return (
    <>
      <div className="hidden md:flex w-full h-28 bg-white rounded-3xl border border-gray300 shadow-md">
        <RegionFilter setShowRegionModal={setShowRegionModal} />
        <DateFilter setShowDateModal={setShowDateModal} />
        <PeopleFilter />
        <PriceFilter setShowPriceModal={setShowPriceModal} />
      </div>
      <div className="w-full flex md:hidden flex-col gap-2.5 px-5 pt-2.5">
        <RegionMobileFilter setShowRegionModal={setShowRegionModal} />
        <DateMobileFilter setShowDateModal={setShowDateModal} />
        <PeopleMobileFilter setShowPeopleModal={setShowPeopleModal} />
        <PriceMobileFilter setShowPriceModal={setShowPriceModal} />
      </div>
    </>
  );
}

export default Filter;
