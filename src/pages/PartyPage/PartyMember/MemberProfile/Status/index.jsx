function Status({ ready }) {
  if (ready)
    return (
      <div className="w-[104px] mt-3 py-1.5 rounded-full text-xs font-medium text-primary bg-skyblue">
        말랑레디 ON
      </div>
    );
  else
    return (
      <div className="w-[104px] mt-3 py-1.5 rounded-full text-xs font-medium text-[#B4B4B4] bg-[#F4F4F4]">
        말랑레디 OFF
      </div>
    );
}

export default Status;
