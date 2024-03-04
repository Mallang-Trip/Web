import minusGray from "../../../../assets/svg/people_minus_gray.svg";
import minusPrimary from "../../../../assets/svg/people_minus_primary.svg";
import plusgray from "../../../../assets/svg/people_plus_gray.svg";
import plusPrimary from "../../../../assets/svg/people_plus_primary.svg";

function Member({ member, setMember }) {
  const setIncrease = () => setMember(member + 1);
  const setDecrease = () => setMember(member - 1);

  return (
    <>
      <div className="pl-6 mx-auto text-2xl text-black font-bold">
        예약 인원을 선택해주세요
      </div>
      <div className="w-full flex justify-center items-center mt-7 gap-5 text-3xl text-primary">
        <button
          className={`w-10 h-10 rounded-full ring-1 flex justify-center items-center ${
            member === 1
              ? "bg-lightgray ring-[#BABABA]"
              : "bg-skyblue ring-primary"
          }`}
          onClick={setDecrease}
          disabled={member === 1}
        >
          <img src={member === 1 ? minusGray : minusPrimary} />
        </button>
        <div className="w-16 text-center">{member}명</div>
        <button
          className={`w-10 h-10 rounded-full ring-1 flex justify-center items-center ${
            member === 10
              ? "bg-lightgray ring-[#BABABA]"
              : "bg-skyblue ring-primary"
          }`}
          onClick={setIncrease}
          disabled={member === 10}
        >
          <img src={member === 10 ? plusgray : plusPrimary} />
        </button>
      </div>
    </>
  );
}

export default Member;
