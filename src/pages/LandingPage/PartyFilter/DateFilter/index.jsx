import { useSelector } from "react-redux";

function DateFilter({ setShowDateModal }) {
  const nowDate = useSelector((state) => state.partyFilter.nowDate);

  return (
    <button
      className="w-full h-full px-8 py-6 flex flex-col justify-between rounded-l-3xl border-r border-gray300"
      onClick={() => setShowDateModal(true)}
    >
      <p className="text-base leading-5 text-gray700 font-medium">
        가능한 일정
      </p>
      <p
        className={`text-2xl leading-7 font-bold ${
          nowDate.length ? "text-gray800" : "text-gray400"
        }`}
      >
        {nowDate.length
          ? `${nowDate[0].getMonth() + 1}/${nowDate[0].getDate()} ~ ${
              nowDate[1].getMonth() + 1
            }/${nowDate[1].getDate()}`
          : "모든 날짜"}
      </p>
    </button>
  );
}

export default DateFilter;
