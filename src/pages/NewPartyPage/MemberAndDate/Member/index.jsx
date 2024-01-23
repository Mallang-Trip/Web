import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function Member({ member, setMember }) {
  const setIncrease = () => member < 10 && setMember(member + 1);
  const setDecrease = () => member > 1 && setMember(member - 1);

  return (
    <>
      <div className="pl-6 mx-auto text-2xl text-black font-bold">
        예약 인원을 선택해주세요
      </div>
      <div className="w-full flex justify-center items-center mt-7 gap-5 text-3xl text-primary">
        <RemoveIcon
          onClick={setDecrease}
          className="border-2 border-red-500 rounded-full text-red-500 cursor-pointer hover:ring ring-red-500/50"
          fontSize="large"
        />
        <div className="w-16 text-center">{member}명</div>
        <AddIcon
          onClick={setIncrease}
          className="border-2 border-primary rounded-full text-primary cursor-pointer hover:ring ring-primary/50"
          fontSize="large"
        />
      </div>
    </>
  );
}

export default Member;
