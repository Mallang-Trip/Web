import { useState } from "react";
import NewRegion from "./NewRegion";
import RegionItem from "./RegionItem";
import EditFormModal from "./EditFormModal";

function RegionList({
  regionData,
  getPartyRegionListFunc,
  setShowDeleteErrorModal,
  searchKeyword,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState({});

  return (
    <>
      <div className="grid grid-cols-1 gap-10 px-6 mx-auto py-8 lg:grid-cols-3 xl:grid-cols-4 overflow-auto">
        {regionData
          .filter((region) => region.region.includes(searchKeyword))
          .map((item) => (
            <RegionItem
              key={item.partyRegionId}
              setShowEditModal={setShowEditModal}
              setEditTarget={setEditTarget}
              getPartyRegionListFunc={getPartyRegionListFunc}
              setShowDeleteErrorModal={setShowDeleteErrorModal}
              {...item}
            />
          ))}
        <NewRegion getPartyRegionListFunc={getPartyRegionListFunc} />
      </div>

      <EditFormModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        editTarget={editTarget}
        getPartyRegionListFunc={getPartyRegionListFunc}
      />
    </>
  );
}

export default RegionList;
