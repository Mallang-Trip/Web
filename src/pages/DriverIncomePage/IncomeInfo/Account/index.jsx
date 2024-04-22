function Account() {
  return (
    <div className="w-full h-44 flex flex-col justify-between border border-[#fafafa] bg-white rounded-3xl shadow-lg px-6 py-4">
      <p className="text-xl text-black font-bold">내 계좌 정보</p>
      <p className="flex flex-col justify-end items-end">
        <span className="text-sm text-gray500 font-medium">예금주: 김말랑</span>
        <span className="text-sm text-gray500 font-medium">
          KB국민 94271237245652
        </span>
      </p>
    </div>
  );
}

export default Account;
