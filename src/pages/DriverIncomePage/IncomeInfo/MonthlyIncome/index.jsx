function MonthlyIncome() {
  return (
    <div className="w-full h-44 flex flex-col justify-between border border-[#fafafa] bg-white rounded-3xl shadow-lg px-6 py-4">
      <p className="text-xl text-black font-bold">2024년 1월</p>
      <p className="flex justify-end items-center gap-2">
        <span className="text-sm text-gray500 font-medium">총 수익금</span>
        <span className="text-xl text-primary font-bold">500,000원</span>
      </p>
    </div>
  );
}

export default MonthlyIncome;
