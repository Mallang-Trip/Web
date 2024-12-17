import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDestinationDetail } from "@/api/destination";
import { Place } from "@/types";
import { PageContainer, CommentList, AddComment, Loading } from "@/components";
import PlaceInfoBox from "./PlaceInfoBox";
import Detailed from "./Detailed";

interface DestinationInfo extends Place {
  images: string[];
}

function DestinationPage() {
  const { destinationId } = useParams();
  const [destinationInfo, setDestinationInfo] = useState<DestinationInfo>({
    address: "",
    avgRate: null,
    content: "",
    destinationId: 0,
    dibs: false,
    images: [],
    lat: 0,
    lon: 0,
    name: "",
    reviews: [],
    views: 0,
  });

  const getDestinationInfo = useCallback(async () => {
    if (!destinationId) return;
    try {
      const result = await getDestinationDetail(Number(destinationId));
      setDestinationInfo(result.payload);
    } catch (e) {
      console.log(e);
    }
  }, [destinationId]);

  useEffect(() => {
    getDestinationInfo();
    window.scrollTo({ top: 0 });
  }, [destinationId]);

  if (!destinationInfo.destinationId) return <Loading full={true} />;
  return (
    <PageContainer>
      <PlaceInfoBox
        {...destinationInfo}
        type={"destination"}
        id={destinationInfo.destinationId}
      />
      <Detailed content={destinationInfo.content} />
      <CommentList
        reviews={destinationInfo.reviews || []}
        isDriver={false}
        reloadData={getDestinationInfo}
      />
      <AddComment
        id={parseInt(destinationId || "0")}
        isDriver={false}
        reloadData={getDestinationInfo}
      />
    </PageContainer>
  );
}

export default memo(DestinationPage);
