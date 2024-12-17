import { Dispatch, memo, SetStateAction, useState } from "react";
import { RegionData } from "@/types";
import NewRegion from "./NewRegion";
import RegionItem from "./RegionItem";
import EditFormModal from "./EditFormModal";

export interface EditTarget {
  partyRegionId: number;
  region: string;
  regionImg: string;
}

interface Props {
  regionData: RegionData[];
  getPartyRegionListFunc: () => void;
  setShowDeleteErrorModal: Dispatch<SetStateAction<boolean>>;
  searchKeyword: string;
}

function RegionList({
  regionData,
  getPartyRegionListFunc,
  setShowDeleteErrorModal,
  searchKeyword,
}: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState<EditTarget>({
    partyRegionId: 0,
    region: "",
    regionImg: "",
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-10 px-6 mx-auto py-8 lg:grid-cols-3 xl:grid-cols-4 overflow-auto">
        {regionData
          .filter((region) => region.name.includes(searchKeyword))
          .map((item) => (
            <RegionItem
              key={item.regionId}
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

export default memo(RegionList);
