import EditButton from "../../../components/EditButton";
import NoTalkList from "./NoTalkList";
import TalkItem from "./TalkItem";

function TalkList({ chatList, openTalkId, setOpenTalkId }) {
  return (
    <aside className="fixed top-14 left-0 z-30 w-full md:w-[450px] h-screen">
      <div className="overflow-y-auto pb-32 md:pb-20 px-3 h-full bg-white md:border-r border-[#D9D9D9] noScrollBar">
        <div className="sticky top-0 pb-3 pt-5 px-0 md:px-2 flex items-center justify-between outline-none border-b border-solid border-[#D9D9D9] bg-white">
          <p className="text-2xl text-black font-bold">말랑톡</p>
          <EditButton
            title={"편집"}
            onClick={() => console.log("채팅방 편집")}
          />
        </div>
        {chatList.length > 0 ? (
          <ul className="space-y-2 border-b border-solid border-[#D9D9D9] py-3 mb-5">
            {chatList.map((chat) => {
              return (
                <TalkItem
                  key={chat.chatRoomId}
                  openTalkId={openTalkId}
                  setOpenTalkId={setOpenTalkId}
                  {...chat}
                />
              );
            })}
          </ul>
        ) : (
          <NoTalkList />
        )}
      </div>
    </aside>
  );
}

export default TalkList;