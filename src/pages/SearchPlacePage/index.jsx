import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import PlaceMap from "../../components/PlaceMap";

function SearchPlacePage() {
  const { keyword } = useParams();

  return (
    <PageContainer>
      <div className="text-2xl pt-8 py-4 text-black">
        가고 싶은 여행지를 찾아요
      </div>
      <PlaceMap search={true} newPlace={true} keyword={keyword} detail={true} />
    </PageContainer>
  );
}

export default SearchPlacePage;
