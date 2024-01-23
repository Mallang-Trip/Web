import { useState } from "react";
import AcceptModal from "./AcceptModal";

function NewPartyAgreement({ getPartyData }) {
  const [accept, setAccept] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="my-7">
        <div className={"flex gap-5 ml-0 sm:ml-10"}>
          <button
            className="h-12 text-darkgray rounded-full text-base font-bold w-full sm:w-80 bg-white border border-darkgray"
            onClick={() => {
              setAccept(false);
              setShowModal(true);
            }}
          >
            가입 거절
          </button>
          <button
            className="h-12 text-white rounded-full text-base font-bold w-full sm:w-80 bg-primary border border-primary"
            onClick={() => {
              setAccept(true);
              setShowModal(true);
            }}
          >
            가입 승인
          </button>
        </div>
      </div>
      <AcceptModal
        showModal={showModal}
        setShowModal={setShowModal}
        getPartyData={getPartyData}
        accept={accept}
      />
    </>
  );
}

export default NewPartyAgreement;
