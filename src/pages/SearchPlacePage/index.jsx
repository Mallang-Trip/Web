import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import PlaceMap from "../../components/PlaceMap";

function SearchPlacePage() {
  const { keyword } = useParams();

  return (
    <PageContainer>
      <p className="text-2xl text-black font-bold my-9">
        가고 싶은 여행지를 찾아요
      </p>
      <PlaceMap
        search={true}
        keyword={keyword}
        searchPage={true}
        onlyAllPlace={true}
      />
    </PageContainer>
  );
}

export default SearchPlacePage;
