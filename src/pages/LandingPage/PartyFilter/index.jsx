import { useState } from "react";
import RegionFilter from "./RegionFilter";
import DateFilter from "./DateFilter";
import PeopleFilter from "./PeopleFilter";
import PriceFilter from "./PriceFilter";
import DateModal from "./DateModal";
import PriceModal from "./PriceModal";
import RegionModal from "./RegionModal";

function PartyFilter() {
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);

  return (
    <>
      <div className="hidden md:flex w-full h-28 bg-white rounded-3xl border border-gray300 shadow-md">
        <RegionFilter setShowRegionModal={setShowRegionModal} />
        <DateFilter setShowDateModal={setShowDateModal} />
        <PeopleFilter />
        <PriceFilter setShowPriceModal={setShowPriceModal} />
      </div>
      <DateModal showModal={showDateModal} setShowModal={setShowDateModal} />
      <PriceModal showModal={showPriceModal} setShowModal={setShowPriceModal} />
      <RegionModal
        showModal={showRegionModal}
        setShowModal={setShowRegionModal}
      />
    </>
  );
}

export default PartyFilter;
