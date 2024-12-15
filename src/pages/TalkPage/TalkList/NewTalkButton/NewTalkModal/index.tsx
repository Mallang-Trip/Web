import {
  Dispatch,
  FormEvent,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { searchUser } from "../../../../../api/users";
import { makeNewCoupleChat, makeNewGroupChat } from "../../../../../api/chat";
import { ChatMember, InviteChatMember } from "../../../../../types";
import Input from "../../../TalkRoom/TalkMenu/MenuMembers/InviteModal/Input";
import SelectMembers from "../../../TalkRoom/TalkMenu/MenuMembers/InviteModal/SelectMembers";
import SearchMemberList from "../../../TalkRoom/TalkMenu/MenuMembers/InviteModal/SearchMemberList";
import NewTalkInfo from "./NewTalkInfo";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  getChatListFunc: () => void;
  setOpenTalkId: Dispatch<SetStateAction<number>>;
}

function NewTalkModal({
  showModal,
  setShowModal,
  getChatListFunc,
  setOpenTalkId,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [inviteMember, setInviteMember] = useState<InviteChatMember[]>([]);
  const [searchList, setSearchList] = useState<ChatMember[]>([]);
  const [roomName, setRoomName] = useState("");

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current === e.target) closeModal();
    },
    [modalRef]
  );

  const searchHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (searchName === "") return alert("닉네임을 입력해주세요.");

      try {
        const result = await searchUser(searchName);
        setSearchList(result.payload);
      } catch (e) {
        console.log(e);
      }
    },
    [searchName]
  );

  const makeNewChatHandler = useCallback(async () => {
    if (inviteMember.length === 0)
      return alert("새로운 말랑챗 상대를 선택해주세요.");

    if (step === 0) return setStep(1);

    // 그룹 말랑챗
    if (inviteMember.length > 1) {
      try {
        if (roomName === "") return alert("말랑챗방 이름을 입력해주세요.");

        const userIds = inviteMember.map((member) => member.userId).join(",");
        const result = await makeNewGroupChat(userIds, roomName);

        if (result.statusCode === 403) {
          alert("정지 기간동안 새로운 말랑챗 생성이 불가능합니다.");
        } else if (result.statusCode === 200) {
          alert("새로운 말랑챗이 생성되었습니다.");
          setOpenTalkId(result.payload.chatRoomId);
        } else {
          setOpenTalkId(result.payload.chatRoomId);
        }
        getChatListFunc();
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
    // 1:1 말랑챗
    else {
      try {
        const result = await makeNewCoupleChat(inviteMember[0].userId);

        if (result.statusCode === 403) {
          alert("정지 기간동안 새로운 말랑챗 생성이 불가능합니다.");
        } else if (result.statusCode === 200) {
          alert("새로운 말랑챗이 생성되었습니다.");
          setOpenTalkId(result.payload.chatRoomId);
        } else {
          setOpenTalkId(result.payload.chatRoomId);
        }
        getChatListFunc();
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  }, [inviteMember, step, roomName]);

  useEffect(() => {
    if (showModal) return;
    setSearchName("");
    setInviteMember([]);
    setSearchList([]);
    setStep(0);
    setRoomName("");
  }, [showModal]);

  return createPortal(
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div className="mx-auto w-96 h-full rounded-xl flex flex-col justify-center items-center">
        <div className="w-full flex flex-col h-3/5 px-9 bg-white rounded-t-xl">
          <p className="text-xl text-black font-bold mt-9 mb-5">
            새로운 말랑챗
          </p>
          {step === 0 ? (
            <>
              <Input
                searchName={searchName}
                setSearchName={setSearchName}
                searchHandler={searchHandler}
              />
              <SelectMembers
                inviteMember={inviteMember}
                setInviteMember={setInviteMember}
              />
              <SearchMemberList
                searchList={searchList}
                inviteMember={inviteMember}
                setInviteMember={setInviteMember}
              />
            </>
          ) : (
            <NewTalkInfo
              inviteMember={inviteMember}
              roomName={roomName}
              setRoomName={setRoomName}
            />
          )}
        </div>
        <div className="w-full flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={makeNewChatHandler}
          >
            {step === 0 ? "다음" : "만들기"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default memo(NewTalkModal);
