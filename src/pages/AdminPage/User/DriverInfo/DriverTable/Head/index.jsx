function Head() {
  return (
    <div className="w-full py-3 grid grid-cols-5 items-center text-center bg-skyblue rounded-xl">
      <p>닉네임</p>
      <p>아이디</p>
      <p>가입 날짜</p>
      <p className="col-span-2">프로필</p>
    </div>
  );
}

export default Head;