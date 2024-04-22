import Body from "./Body";
import Head from "./Head";

function IncomeTable() {
  return (
    <div className="w-full">
      <p className="text-xl text-black font-bold mb-4">수익금 내역</p>
      <div className="w-full flex flex-col gap-2 text-sm font-semibold">
        <Head />
        <Body />
        <Body />
        <Body />
      </div>
    </div>
  );
}

export default IncomeTable;
