function Anywhere({ regionClickHandler }) {
  return (
    <div
      className="flex items-center justify-center w-full h-64 text-xl text-white rounded-lg bg-primary cursor-pointer"
      onClick={() => regionClickHandler("아무데나")}
    >
      아무데나
    </div>
  );
}

export default Anywhere;
