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
import { searchUser } from "@/api/users";
import { inviteMemberAPI } from "@/api/chat";
import { ChatMember, InviteChatMember } from "@/types";
import Input from "./Input";
import SelectMembers from "./SelectMembers";
import SearchMemberList from "./SearchMemberList";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  chatRoomId: number;
  getChatRoomDataFunc: () => void;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

function InviteModal({
  showModal,
  setShowModal,
  chatRoomId,
  getChatRoomDataFunc,
  setShowMenu,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [searchName, setSearchName] = useState("");
  const [inviteMember, setInviteMember] = useState<InviteChatMember[]>([]);
  const [searchList, setSearchList] = useState<ChatMember[]>([]);

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

  const inviteHandler = useCallback(async () => {
    if (inviteMember.length === 0) return alert("초대할 상대를 선택해주세요.");

    const userIds = inviteMember.map((member) => member.userId).join(",");

    try {
      await inviteMemberAPI(chatRoomId, userIds);
      alert("초대가 완료되었습니다.");
      getChatRoomDataFunc();
      closeModal();
      setShowMenu(false);
    } catch (e) {
      console.log(e);
    }
  }, [inviteMember, chatRoomId]);

  useEffect(() => {
    if (showModal) return;
    setSearchName("");
    setInviteMember([]);
    setSearchList([]);
  }, [showModal]);

  return createPortal(
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      style={{ zIndex: 100 }}
      ref={modalRef}
      onClick={modalOutSideClick}
      id="invite-modal"
    >
      <div className="mx-auto w-96 h-full rounded-xl flex flex-col justify-center items-center">
        <div className="w-full flex flex-col h-3/5 px-9 bg-white rounded-t-xl">
          <p className="text-xl text-black font-bold mt-9 mb-5">초대하기</p>
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
            onClick={inviteHandler}
          >
            초대
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default memo(InviteModal);
