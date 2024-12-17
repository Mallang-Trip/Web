import { Dispatch, memo, SetStateAction, useMemo } from "react";
import { ChatRoomList } from "@/types";
import NewTalkButton from "./NewTalkButton";
import NoTalkList from "./NoTalkList";
import TalkItem from "./TalkItem";

interface Props {
  chatList: ChatRoomList[];
  openTalkId: number;
  setOpenTalkId: Dispatch<SetStateAction<number>>;
  getChatListFunc: () => void;
}

function TalkList({
  chatList,
  openTalkId,
  setOpenTalkId,
  getChatListFunc,
}: Props) {
  const sortedChatList = useMemo(
    () =>
      chatList.sort((a, b) => {
        const timeA = new Date(a.updatedAt).getTime();
        const timeB = new Date(b.updatedAt).getTime();
        return timeB - timeA;
      }),
    [chatList]
  );

  return (
    <aside className="fixed top-14 left-0 z-30 w-full md:w-[450px] h-real-screen">
      <div className="pb-32 md:pb-20 px-3 h-full bg-white md:border-r border-mediumgray">
        <div className="sticky top-0 pb-2.5 pt-5 px-0 md:px-2 flex items-center justify-between outline-none border-b border-solid border-mediumgray bg-white">
          <p className="text-2xl text-black font-bold my-2">말랑챗</p>
        </div>
        {sortedChatList.length > 0 ? (
          <ul
            className="space-y-2 border-b border-solid border-mediumgray pt-3 mb-3 custom-scrollbar"
            style={{ height: "calc(100% - 90px)" }}
          >
            {sortedChatList.map((chat) => {
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

      <NewTalkButton
        getChatListFunc={getChatListFunc}
        setOpenTalkId={setOpenTalkId}
      />
    </aside>
  );
}

export default memo(TalkList);
