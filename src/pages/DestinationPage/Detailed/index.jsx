function Detailed({ content }) {
  return (
    <div className="pb-8">
      <p className="text-xl font-bold mb-1">상세설명</p>
      <div className="text-sm md:text-base">{content}</div>
    </div>
  );
}

export default Detailed;
