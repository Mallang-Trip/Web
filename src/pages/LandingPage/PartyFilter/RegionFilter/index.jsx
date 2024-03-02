import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRegion } from "../../../../redux/modules/partyFilterSlice";
import RegionModal from "./RegionModal";

function RegionFilter() {
  const dispatch = useDispatch();
  const region = useSelector((state) => state.partyFilter.region);
  const [showModal, setShowModal] = useState(false);

  const regionClickHandler = (target) => {
    dispatch(setRegion(target));
    setShowModal(false);
  };

  return (
    <>
      <button
        className="w-full h-full px-8 py-6 flex flex-col justify-between rounded-l-3xl border-r border-gray300"
        onClick={() => setShowModal(true)}
      >
        <p className="text-base leading-5 text-gray700 font-medium">목적지</p>
        <p
          className={`text-2xl leading-7 text-gray400 font-bold  ${
            region === "모든 지역" ? "text-gray400" : "text-gray800"
          }`}
        >
          {region}
        </p>
      </button>
      <RegionModal
        showModal={showModal}
        setShowModal={setShowModal}
        regionClickHandler={regionClickHandler}
      />
    </>
  );
}

export default RegionFilter;
