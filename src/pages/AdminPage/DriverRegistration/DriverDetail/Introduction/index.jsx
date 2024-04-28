function Introduction({ introduction }) {
  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">
        드라이버 자기소개
      </p>
      <div className="w-full h-28 py-4 px-6 rounded-xl whitespace-nowrap text-sm relative text-darkgray bg-lightgray">
        {introduction}
      </div>
    </>
  );
}

export default Introduction;
