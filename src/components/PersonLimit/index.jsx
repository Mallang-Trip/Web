function PersonLimit({ capacity }) {
  return (
    <div className="py-6">
      <p className="text-2xl font-bold">최대 정원</p>
      <p className="text-xl text-darkgray">{`${capacity}명`}</p>
    </div>
  );
}

export default PersonLimit;
