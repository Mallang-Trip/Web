import { memo, useCallback, useEffect, useState } from "react";
import { getPartyDetail } from "../../../../../api/admin";
import { Party } from "../../../../../types";
import Loading from "../../../../../components/Loading";
import HeadTitle from "../../../../../components/HeadTitle";
import ImageBox from "../../../../../components/ImageBox";
import PartyIconBox from "../../../../../components/PartyIconBox";
import PartyDate from "../../../../PartyPage/PartyDate";
import PartyMember from "../../../../PartyPage/PartyMember";
import ToTalPrice from "../../../../PartyPage/ToTalPrice";
import PartyPlan from "../../../../../components/PartyPlan";
import CourseMap from "../../../../../components/CourseMap";
import BottomRefundUser from "../../../../../components/BottomRefundUser";
import BottomRefundDriver from "../../../../../components/BottomRefundDriver";
import MallangReady from "./MallangReady";
import CancelPrice from "./CancelPrice";
import Promotion from "./Promotion";

interface Props {
  partyId: string | null;
}

function PartyDetail({ partyId }: Props) {
  const [loading, setLoading] = useState(true);
  const [partyData, setPartyData] = useState<Party>();

  const getPartyDetailFunc = useCallback(async () => {
    if (!partyId) return;
    try {
      const result = await getPartyDetail(partyId);
      setPartyData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [partyId]);

  useEffect(() => {
    getPartyDetailFunc();
  }, [partyId]);

  if (loading || !partyData) return <Loading full={false} />;
  return (
    <div className="text-base font-medium">
      <HeadTitle
        name={partyData.course.name}
        driverName={partyData.driverName}
        driverId={partyData.driverId}
        isDriver={true}
        partyStatus={partyData.partyStatus}
        myParty={true}
      />
      <ImageBox images={partyData.course.images} name={partyData.course.name} />
      <PartyIconBox
        images={partyData.course.images}
        name={partyData.course.name}
        dibs={partyData.dibs}
        type="party"
        id={partyData.partyId}
      />
      <Promotion promotion={partyData?.promotion} />
      <PartyDate startDate={partyData.startDate} />
      <PartyMember
        {...partyData}
        myParty={true}
        partyId={partyId === null ? 0 : parseInt(partyId)}
      />
      {partyData.partyStatus === "CANCELED_BY_DRIVER_REFUSED" ||
      partyData.partyStatus === "CANCELED_BY_PROPOSER" ||
      partyData.partyStatus === "CANCELED_BY_EXPIRATION" ||
      partyData.partyStatus === "CANCELED_BY_ALL_QUIT" ||
      partyData.partyStatus === "CANCELED_BY_DRIVER_QUIT" ? (
        <CancelPrice discountPrice={partyData.course?.discountPrice} />
      ) : (
        <>
          <MallangReady
            partyId={partyId || "0"}
            driverReady={partyData.driverReady}
            partyStatus={partyData.partyStatus}
            startDate={partyData.startDate}
            getPartyDetailFunc={getPartyDetailFunc}
          />
          <ToTalPrice
            totalPrice={partyData.course?.totalPrice}
            isDriver={true}
            partyStatus={partyData.partyStatus}
          />
        </>
      )}
      <PartyPlan
        edit={false}
        course={partyData.course}
        startDate={partyData.startDate}
      />
      <CourseMap
        markerData={partyData.course.days[0].destinations}
        reload={false}
        mapName="TMAP_COURSE_ADMIN"
      />
      <BottomRefundUser />
      <BottomRefundDriver />
    </div>
  );
}

export default memo(PartyDetail);
