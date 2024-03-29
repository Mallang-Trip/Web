function Detailed({ content }) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">상세설명</p>
      <div className="text-sm text-darkgray font-medium">{content}</div>
    </div>
  );
}

export default Detailed;
