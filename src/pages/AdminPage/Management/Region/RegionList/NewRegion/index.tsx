import { memo, useState } from "react";
import FormModal from "./FormModal";

interface Props {
  getPartyRegionListFunc: () => void;
}

function NewRegion({ getPartyRegionListFunc }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="relative h-64 cursor-pointer bg-primary text-xl text-white font-bold rounded-lg"
        onClick={() => setShowModal(true)}
      >
        새로운 지역 추가
      </button>
      <FormModal
        showModal={showModal}
        setShowModal={setShowModal}
        getPartyRegionListFunc={getPartyRegionListFunc}
      />
    </>
  );
}

export default memo(NewRegion);
