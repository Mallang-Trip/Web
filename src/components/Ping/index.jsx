function Ping({ top = "0", left = "0" }) {
  return (
    <span className={`absolute translate-x-4 top-${top} left-${left}`}>
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
      </span>
    </span>
  );
}

export default Ping;