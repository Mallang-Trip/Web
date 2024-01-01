import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import ThirdBox from "./ThirdBox";
import FinalBox from "./FinalBox";

function BlueContaner({
  region,
  setRegion,
  nowDate,
  setNowDate,
  num,
  setNum,
  price,
  setPrice,
}) {
  return (
    <div className="flex justify-center gap-1 w-full px-5 lg:px-20 h-40 bg-primary rounded-tl-3xl rounded-br-3xl">
      <FirstBox region={region} setRegion={setRegion} />
      <SecondBox nowDate={nowDate} setNowDate={setNowDate} />
      <ThirdBox num={num} setNum={setNum} />
      <FinalBox price={price} setPrice={setPrice} />
    </div>
  );
}

export default BlueContaner;
