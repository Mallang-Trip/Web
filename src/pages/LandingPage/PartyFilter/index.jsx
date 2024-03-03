import { useState } from "react";
import RegionFilter from "./RegionFilter";
import DateFilter from "./DateFilter";
import PeopleFilter from "./PeopleFilter";
import PriceFilter from "./PriceFilter";
import RegionModal from "./RegionModal";
import DateModal from "./DateModal";
import PeopleModal from "./PeopleModal";
import PriceModal from "./PriceModal";

function PartyFilter() {
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);

  return (
    <>
      <div className="hidden md:flex w-full h-28 bg-white rounded-3xl border border-gray300 shadow-md">
        <RegionFilter setShowRegionModal={setShowRegionModal} />
        <DateFilter setShowDateModal={setShowDateModal} />
        <PeopleFilter />
        <PriceFilter setShowPriceModal={setShowPriceModal} />
      </div>
      <RegionModal
        showModal={showRegionModal}
        setShowModal={setShowRegionModal}
      />
      <DateModal showModal={showDateModal} setShowModal={setShowDateModal} />
      <PeopleModal
        showModal={showPeopleModal}
        setShowModal={setShowPeopleModal}
      />
      <PriceModal showModal={showPriceModal} setShowModal={setShowPriceModal} />
    </>
  );
}

export default PartyFilter;
