import { useState } from "react";
import { useSelector } from "react-redux";
import PageContainer from "../../components/PageContainer";
import BlueContaner from "./BlueContaner";
import PartyList from "./PartyList";
import NewPartyButton from "./NewPartyButton";

function LandingPage() {
  const user = useSelector((state) => state.user);
  const [region, setRegion] = useState("모든 지역");
  const [nowDate, setNowDate] = useState([]);
  const [num, setNum] = useState(1);
  const [price, setPrice] = useState(1010000);

  return (
    <PageContainer>
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl pb-3 pl-5 mx-auto overflow-hidden text-2xl font-bold">
        어디로 떠나고 싶으신가요?
      </div>
      <BlueContaner
        region={region}
        setRegion={setRegion}
        nowDate={nowDate}
        setNowDate={setNowDate}
        num={num}
        setNum={setNum}
        price={price}
        setPrice={setPrice}
      />
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl pt-10 mb-6 pl-5 mx-auto overflow-hidden text-2xl font-bold">
        {user.nickname ? `${user.nickname} 님께 추천하는 파티` : "추천 파티"}
      </div>
      <PartyList region={region} nowDate={nowDate} num={num} price={price} />
      <NewPartyButton />
    </PageContainer>
  );
}

export default LandingPage;
