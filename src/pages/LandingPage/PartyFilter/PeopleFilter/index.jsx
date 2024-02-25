import minusGray from "../../../../assets/svg/people_minus_gray.svg";
import minusPrimary from "../../../../assets/svg/people_minus_primary.svg";
import plusgray from "../../../../assets/svg/people_plus_gray.svg";
import plusPrimary from "../../../../assets/svg/people_plus_primary.svg";

function PeopleFilter({ num, setNum }) {
  const setIncrease = () => setNum(num + 1);
  const setDecrease = () => setNum(num - 1);

  return (
    <div className="w-full h-32 my-auto bg-white">
      <p className="mt-3 mb-5 ml-2 text-gray-500 text-base text-gray">
        참여 인원
      </p>
      <div className="flex w-full flex-row justify-center items-center gap-4 text-xl text-black">
        <button
          className={`w-10 h-10 rounded-full ring-1 flex justify-center items-center ${
            num === 1
              ? "bg-lightgray ring-[#BABABA]"
              : "bg-skyblue ring-primary"
          }`}
          onClick={setDecrease}
          disabled={num === 1}
        >
          <img src={num === 1 ? minusGray : minusPrimary} />
        </button>
        <div className="w-11 text-center">{num}명</div>
        <button
          className={`w-10 h-10 rounded-full ring-1 flex justify-center items-center ${
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
