import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDestinationDetail } from "../../api/destination";
import PageContainer from "../../components/PageContainer";
import CommentList from "../../components/Comment/CommentList";
import AddComment from "../../components/Comment/AddComment";
import PlaceInfoBox from "../CourseSuggestPage/PlaceInfoBox";
import Detailed from "../CourseSuggestPage/Atoms/Detailed";

function DestinationPage() {
  const { destinationId } = useParams();
  const [destinationInfo, setDestinationInfo] = useState({});
  const [destinationInfoReload, setDestinationInfoReload] = useState(false);

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
  }, [destinationId, destinationInfoReload]);

  if (!destinationInfo.destinationId) return null;
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
        reload={destinationInfoReload}
        setReload={setDestinationInfoReload}
      />
      <AddComment
        id={destinationId}
        isDriver={false}
        reload={destinationInfoReload}
        setReload={setDestinationInfoReload}
      />
    </PageContainer>
  );
}

export default DestinationPage;
