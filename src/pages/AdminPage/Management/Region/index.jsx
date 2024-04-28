import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPartyRegionList } from "../../../../api/region";
import Title from "../../../../components/Title";
import ConfirmModal from "../../../../components/ConfirmModal";
import SearchBar from "./SearchBar";
import RegionList from "./RegionList";
import RegionDriver from "./RegionDriver";

function Region() {
  const [searchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [regionData, setRegionData] = useState([]);
  const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);
  const regionId = searchParams.get("region_id");

  const getPartyRegionListFunc = async () => {
    try {
      const result = await getPartyRegionList();
      setRegionData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPartyRegionListFunc();
  }, []);

  return (
    <div className="text-base font-medium">
      <div className="h-11 flex justify-between items-center">
        <Title title="가고 싶은 지역 편집" />
        <SearchBar
          keyword={searchKeyword}
          setKeyword={setSearchKeyword}
          regionId={regionId}
        />
      </div>
      {regionId ? (
        <RegionDriver />
      ) : (
        <RegionList
          regionData={regionData}
          getPartyRegionListFunc={getPartyRegionListFunc}
          setShowDeleteErrorModal={setShowDeleteErrorModal}
          searchKeyword={searchKeyword}
        />
      )}
      <ConfirmModal
        showModal={showDeleteErrorModal}
        setShowModal={setShowDeleteErrorModal}
        message={
          "해당 지역에 드라이버가 존재합니다.\n지역을 삭제할 수 없습니다."
        }
      />
    </div>
  );
}

export default Region;
