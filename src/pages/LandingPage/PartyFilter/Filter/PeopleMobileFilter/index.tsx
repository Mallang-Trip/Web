import { Dispatch, memo, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import partyFilterPeople from "../../../../../assets/svg/party_filter_people.svg";
import clsx from "clsx";

interface Props {
  setShowPeopleModal: Dispatch<SetStateAction<boolean>>;
}

function PeopleMobileFilter({ setShowPeopleModal }: Props) {
  const num = useSelector((state: RootState) => state.partyFilter.num);

  return (
    <button
      className="w-full h-12 flex gap-4 items-center px-4 text-sm font-bold bg-lightgray rounded-lg"
      onClick={() => setShowPeopleModal(true)}
    >
      <img src={partyFilterPeople} alt="인원" />
      <span className={clsx(num === 1 ? "text-textgray" : "text-boldgray")}>
        {num === 1 ? "참여 인원" : `${num}명`}
      </span>
    </button>
  );
}

export default memo(PeopleMobileFilter);
