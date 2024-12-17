import { memo } from "react";
import { useParams } from "react-router-dom";
import { PageContainer, PlaceMap, Title } from "@/components";

function SearchPlacePage() {
  const { keyword } = useParams();

  return (
    <PageContainer>
      <Title title="가고 싶은 여행지를 찾아요" />
      <div className="my-7" />
      <PlaceMap
        search={true}
        keyword={keyword || ""}
        searchPage={true}
        onlyAllPlace={true}
      />
    </PageContainer>
  );
}

export default memo(SearchPlacePage);
