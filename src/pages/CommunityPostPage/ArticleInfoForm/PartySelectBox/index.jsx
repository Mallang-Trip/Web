import { useState } from "react";
import PartyModal from "./PartyModal";

function PartySelectBox({ selectedParty, setSelectedParty }) {
  const [showPartyModal, setShowPartyModal] = useState(false);

  return (
    <>
      <button
        className="w-[200px] h-[50px] border border-mediumgray rounded-lg py-4 px-5 text-sm text-black flex items-center"
        onClick={() => setShowPartyModal(true)}
      >
        {selectedParty.name}
      </button>
      <PartyModal
        showModal={showPartyModal}
        setShowModal={setShowPartyModal}
        setSelectedParty={setSelectedParty}
      />
    </>
  );
}

export default PartySelectBox;
