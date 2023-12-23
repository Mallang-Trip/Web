import Member from "./Member";

function MenuMembers({ members, isGroup, chatRoomId }) {
  return (
    <div className="h-full px-4 pb-16 overflow-y-auto noScrollBar">
      <div className="mb-3 flex justify-between items-center">
        <p className="text-lg text-black font-bold">대화 상대</p>
        {isGroup && (
          <button
            className="bg-skyblue text-primary py-1.5 px-3 text-xs rounded-lg border border-primary"
            onClick={() => console.log(chatRoomId)}
          >
            초대하기
          </button>
        )}
      </div>
      {members.map((member) => (
        <Member key={member.userId} {...member} />
      ))}
    </div>
  );
}

export default MenuMembers;
