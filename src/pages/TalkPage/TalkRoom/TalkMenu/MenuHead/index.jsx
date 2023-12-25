function MenuHead({ roomName, headCount, isGroup }) {
  return (
    <>
      <div className="pt-16 px-4 flex flex-col gap-2">
        <p className="text-xl text-black font-bold">{roomName}</p>
        <p className="text-sm text-darkgray">{`${headCount}명 참여중 ${
          isGroup ? "(그룹 말랑톡)" : "(개인 말랑톡)"
        }`}</p>
      </div>
      <hr className="bg-darkgray/30 my-4 h-px border-0 mx-3" />
    </>
  );
}

export default MenuHead;
