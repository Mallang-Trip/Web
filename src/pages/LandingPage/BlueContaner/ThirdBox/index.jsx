import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function ThirdBox({ num, setNum }) {
  const setIncrease = () => num < 10 && setNum(num + 1);
  const setDecrease = () => num > 1 && setNum(num - 1);

  return (
    <div className="w-full h-32 my-auto bg-white">
      <p className="mt-3 mb-5 ml-2 text-gray-500 text-xs md:text-base text-gray">
        참여 인원
      </p>
      <div className="hidden md:flex w-full flex-row justify-center items-center gap-3 text-xl text-black">
        <RemoveIcon
          onClick={setDecrease}
          className="border-2 border-red-500 rounded-full text-red-500 cursor-pointer"
        />
        <div>{num}명</div>
        <AddIcon
          onClick={setIncrease}
          className="border-2 border-primary rounded-full text-primary cursor-pointer"
        />
      </div>
      <div className="md:hidden w-full flex flex-col justify-between items-center text-base text-black">
        <div>{num}명</div>
        <div className="w-full flex justify-center gap-5 mt-3">
          <RemoveIcon
            onClick={setDecrease}
            className="border-2 border-red-500 rounded-full text-red-500 cursor-pointer"
          />
          <AddIcon
            onClick={setIncrease}
            className="border-2 border-primary rounded-full text-primary cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default ThirdBox;
