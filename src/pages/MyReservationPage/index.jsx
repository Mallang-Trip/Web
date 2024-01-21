import { useEffect, useState } from "react";
import { getMyParty } from "../../api/party";
import PageContainer from "../../components/PageContainer";
import NoReservationData from "./NoReservationData";
import ReservationList from "./ReservationList";
import Loading from "../../components/Loading";

function MyReservationPage() {
  const [myReservationData, setMyReservationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyPartyData = async () => {
    setLoading(true);

    try {
      const result = await getMyParty();
      setMyReservationData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyPartyData();
  }, []);

  return (
    <PageContainer>
      <div className="text-2xl text-black font-bold">예약 내역</div>
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

export default MyReservationPage;
