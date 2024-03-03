import { useSelector } from "react-redux";
import partyFilterDate from "../../../../../assets/svg/party_filter_date.svg";

function DateMobileFilter({ setShowDateModal }) {
  const nowDate = useSelector((state) => state.partyFilter.nowDate);

  return (
    <button
      className="w-full h-12 flex gap-4 items-center px-4 text-sm font-bold bg-lightgray rounded-lg"
      onClick={() => setShowDateModal(true)}
    >
      <img src={partyFilterDate} />
      <span className={nowDate.length ? "text-boldgray" : "text-textgray"}>
        {nowDate.length
          ? `${String(nowDate[0].getMonth() + 1).padStart(2, "0")}.${String(
              nowDate[0].getDate()
            ).padStart(2, "0")} - ${String(nowDate[1].getMonth() + 1).padStart(
              2,
              "0"
            )}.${String(nowDate[1].getDate()).padStart(2, "0")}`
          : "가능한 일정"}
      </span>
    </button>
  );
}

export default DateMobileFilter;
