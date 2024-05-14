function Head() {
  return (
    <div className="w-full py-3 grid grid-cols-7 items-center text-center bg-skyblue rounded-xl">
      <p>성함</p>
      <p>아이디</p>
      <p>지역</p>
      <p>전화번호</p>
      <p>가입 날짜</p>
      <p className="col-span-2">프로필</p>
    </div>
  );
}

export default Head;
