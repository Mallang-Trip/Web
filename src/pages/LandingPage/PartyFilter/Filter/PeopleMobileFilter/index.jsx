import { useSelector } from "react-redux";
import partyFilterPeople from "../../../../../assets/svg/party_filter_people.svg";

function PeopleMobileFilter({ setShowPeopleModal }) {
  const num = useSelector((state) => state.partyFilter.num);

  return (
    <button
      className="w-full h-12 flex gap-4 items-center px-4 text-sm font-bold bg-lightgray rounded-lg"
      onClick={() => setShowPeopleModal(true)}
    >
      <img src={partyFilterPeople} />
      <span className={num === 1 ? "text-textgray" : "text-boldgray"}>
        {num === 1 ? "참여 인원" : `${num}명`}
      </span>
    </button>
  );
}

export default PeopleMobileFilter;