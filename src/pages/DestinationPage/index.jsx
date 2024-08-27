import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDestinationDetail } from "../../api/destination";
import PageContainer from "../../components/PageContainer";
import CommentList from "../../components/Comment/CommentList";
import AddComment from "../../components/Comment/AddComment";
import PlaceInfoBox from "./PlaceInfoBox";
import Detailed from "./Detailed";
import Loading from "../../components/Loading";

function DestinationPage() {
  const { destinationId } = useParams();
  const [destinationInfo, setDestinationInfo] = useState({});

  const getDestinationInfo = async () => {
    try {
      const result = await getDestinationDetail(destinationId);
      setDestinationInfo(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

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
        id={destinationId}
        isDriver={false}
        reloadData={getDestinationInfo}
      />
    </PageContainer>
  );
}

export default DestinationPage;
