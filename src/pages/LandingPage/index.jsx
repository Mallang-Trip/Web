import { useSelector } from "react-redux";
import PageContainer from "../../components/PageContainer";
import PartyFilter from "./PartyFilter";
import PartyList from "./PartyList";
import NewPartyButton from "./NewPartyButton";

function LandingPage() {
  const user = useSelector((state) => state.user);

  return (
    <PageContainer>
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl pb-3 pl-5 mx-auto overflow-hidden text-2xl font-bold">
        어디로 떠나고 싶으신가요?
      </div>
      <PartyFilter />
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl pt-10 mb-6 pl-5 mx-auto overflow-hidden text-2xl font-bold">
        {user.nickname ? `${user.nickname} 님께 추천하는 파티` : "추천 파티"}
      </div>
      <PartyList />
      <NewPartyButton />
    </PageContainer>
  );
}

export default LandingPage;
