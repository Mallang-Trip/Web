import { useDispatch, useSelector } from "react-redux";
import { setNum } from "../../../../../redux/modules/partyFilterSlice";
import minusGray from "../../../../../assets/svg/people_minus_gray.svg";
import minusPrimary from "../../../../../assets/svg/people_minus_primary.svg";
import plusgray from "../../../../../assets/svg/people_plus_gray.svg";
import plusPrimary from "../../../../../assets/svg/people_plus_primary.svg";

function PeopleFilter() {
  const dispatch = useDispatch();
  const num = useSelector((state) => state.partyFilter.num);

  const setIncrease = () => dispatch(setNum(num + 1));
  const setDecrease = () => dispatch(setNum(num - 1));

  return (
    <div className="w-full h-full px-8 py-6 flex flex-col justify-between rounded-l-3xl border-r border-gray300">
      <p className="text-base leading-5 text-gray700 font-medium">참여 인원</p>
      <div className="w-full flex justify-start items-center">
        <button
          className={`w-7 h-7 rounded-full ring-1 flex justify-center items-center ${
            num === 1
              ? "bg-lightgray ring-[#BABABA]"
              : "bg-skyblue ring-primary"
          }`}
          onClick={setDecrease}
          disabled={num === 1}
        >
          <img src={num === 1 ? minusGray : minusPrimary} />
        </button>
        <div
          className={`w-16 h-7 text-center text-2xl leading-7 font-bold ${
            num === 1 ? "text-gray400" : "text-gray800"
          }`}
        >
          {num}
        </div>
        <button
          className={`w-7 h-7 rounded-full ring-1 flex justify-center items-center ${
            num === 10
              ? "bg-lightgray ring-[#BABABA]"
              : "bg-skyblue ring-primary"
          }`}
          onClick={setIncrease}
          disabled={num === 10}
        >
          <img src={num === 10 ? plusgray : plusPrimary} />
        </button>
      </div>
    </div>
  );
}

export default PeopleFilter;
