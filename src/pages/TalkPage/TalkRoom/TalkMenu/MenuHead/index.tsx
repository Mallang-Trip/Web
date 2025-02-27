import { Dispatch, memo, SetStateAction, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoomType } from "@/types";
import groupTalkImage from "@/assets/images/groupTalkImage.png";
import PartyToggle from "./PartyToggle";
import clsx from "clsx";

interface Props {
  roomName: string;
  headCount: number;
  type: ChatRoomType;
  openTalkId: number;
  setRoomId: Dispatch<SetStateAction<number>>;
  partyId: number | null;
}

function MenuHead({
  roomName,
  headCount,
  type,
  openTalkId,
  setRoomId,
  partyId,
}: Props) {
  const navigation = useNavigate();

  const roomType = useMemo(
    () => ({
      COUPLE: "개인 말랑챗",
      GROUP: "그룹 말랑챗",
      PARTY_PUBLIC: "일정 공개 말랑챗",
      PARTY_PRIVATE: "일행 전용 말랑챗",
    }),
    []
  );

  return (
    <>
      <div className="pt-16 px-4 flex gap-4">
        {type !== "COUPLE" && (
          <img
            src={groupTalkImage}
            alt={roomName}
            className="w-14 h-14 rounded-full"
          />
        )}
        <div className="flex flex-col gap-2">
          <p>
            <span
              className={clsx(
                "text-xl text-black font-bold",
                partyId &&
                  "hover:underline hover:underline-offset-2 cursor-pointer text-primary"
              )}
              onClick={() => partyId && navigation(`/party/detail/${partyId}`)}
            >
              {roomName}
            </span>
          </p>
          <p className="text-sm text-darkgray">{`${headCount}명 참여중 (${roomType[type]})`}</p>
        </div>
      </div>
      <PartyToggle type={type} openTalkId={openTalkId} setRoomId={setRoomId} />
      <hr className="bg-darkgray/30 my-4 h-px border-0 mx-3" />
    </>
  );
}

export default memo(MenuHead);
