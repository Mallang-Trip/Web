function PriceInfo({ modifyMode, content }) {
  return (
    <div
      className={`flex gap-5 py-4 px-6 rounded-xl whitespace-nowrap bg-[#F4F4F4] text-sm text-center text-darkgray ${
        modifyMode && "text-primary"
      }`}
    >
      {content}
    </div>
  );
}

export default PriceInfo;
