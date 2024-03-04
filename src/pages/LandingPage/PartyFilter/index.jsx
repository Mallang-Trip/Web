import { useState } from "react";
import Filter from "./Filter";
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
      <Filter
        setShowRegionModal={setShowRegionModal}
        setShowDateModal={setShowDateModal}
        setShowPeopleModal={setShowPeopleModal}
        setShowPriceModal={setShowPriceModal}
      />

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
