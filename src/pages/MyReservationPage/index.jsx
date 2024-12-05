import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMyParty, getMyDriverParty } from "../../api/party";
import PageContainer from "../../components/PageContainer";
import Loading from "../../components/Loading";
import NoReservationData from "./NoReservationData";
import ReservationList from "./ReservationList";

function MyReservationPage() {
  const user = useSelector((state) => state.user);
  const [myReservationData, setMyReservationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyPartyData = async () => {
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
