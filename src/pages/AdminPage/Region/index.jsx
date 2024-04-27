import { useEffect, useState } from "react";
import { getPartyRegionList } from "../../../api/region";
import Title from "../../../components/Title";
import SearchBar from "./SearchBar";
import RegionList from "./RegionList";

function Region() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [regionData, setRegionData] = useState([]);

  const getPartyRegionListFunc = async () => {
    try {
      const result = await getPartyRegionList();
      setRegionData(result.payload);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPartyRegionListFunc();
  }, []);

  return (
    <div className="text-base font-medium">
      <div className="flex justify-between items-center">
        <Title title="가고 싶은 지역 편집" />
        <SearchBar
          keyword={searchKeyword}
          setKeyword={setSearchKeyword}
          submitHandler={() => console.log("first")}
        />
      </div>
      <RegionList
        regionData={regionData}
        getPartyRegionListFunc={getPartyRegionListFunc}
      />
    </div>
  );
}

export default Region;
