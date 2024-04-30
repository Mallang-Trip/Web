function DriverTab({ tab, setTab }) {
  return (
    <div className="w-full grid grid-cols-3 rounded-lg">
      <button
        className={`h-12 rounded-l-lg border border-primary text-sm font-semibold transition-all duration-300 ${tab === 0 ? "text-white bg-primary" : "text-primary bg-white"}`}
        onClick={() => setTab(0)}
      >
        예약된 파티
      </button>
      <button
        className={`h-12 border-y border-primary text-sm font-semibold transition-all duration-300 ${tab === 1 ? "text-white bg-primary" : "text-primary bg-white"}`}
        onClick={() => setTab(1)}
      >
        가입된 파티
      </button>
      <button
        className={`h-12 rounded-r-lg border border-primary text-sm font-semibold transition-all duration-300 ${tab === 2 ? "text-white bg-primary" : "text-primary bg-white"}`}
        onClick={() => setTab(2)}
      >
        새로운 파티 신청
      </button>
    </div>
  );
}

export default DriverTab;
