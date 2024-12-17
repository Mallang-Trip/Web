import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMyParty, getMyDriverParty } from "@/api/party";
import { RootState } from "@/redux/store";
import { Party } from "@/types";
import { PageContainer, Loading, Title } from "@/components";
import NoReservationData from "./NoReservationData";
import ReservationList from "./ReservationList";

function MyReservationPage() {
  const user = useSelector((state: RootState) => state.user);
  const [myReservationData, setMyReservationData] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);

  const getMyPartyData = useCallback(async () => {
    setLoading(true);

    try {
      const result =
        user.role === "ROLE_DRIVER"
          ? await getMyDriverParty()
          : await getMyParty();
      if (result.payload) setMyReservationData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getMyPartyData();
  }, []);

  return (
    <PageContainer>
      <Title title="예약 내역" />
      {loading ? (
        <Loading full={true} />
      ) : myReservationData.length === 0 ? (
        <NoReservationData />
      ) : (
        <ReservationList myReservationData={myReservationData} />
      )}
    </PageContainer>
  );
}

export default memo(MyReservationPage);
