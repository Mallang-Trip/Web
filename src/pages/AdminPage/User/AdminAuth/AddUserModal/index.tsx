import {
  ChangeEvent,
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AdminUserItem from "./AdminUserItem";
import clsx from "clsx";

export interface UserType {
  image: string;
  username: string;
  age: number;
  sex: string;
}

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  titleMessage: string;
  placeholder: string;
  userList: UserType[];
  noText: string;
  yesText: string;
  yesHandler: () => void;
}

function AddUserModal({
  showModal,
  setShowModal,
  titleMessage,
  placeholder,
  userList,
  noText,
  yesText,
  yesHandler,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState("");

  const closeModal = useCallback(() => setShowModal(false), []);

  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  }, []);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) closeModal();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") closeModal();
    else if (event.key === "Enter") yesHandler();
  }, []);

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");
    setData("");
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div className="m-auto shadow w-[31.25rem] rounded-xl">
        <div className="flex flex-col justify-center text-center text-gray900 whitespace-pre bg-white rounded-t-xl text-xl font-semibold pt-16 pb-10">
          {titleMessage}
        </div>
        <div className="flex items-center justify-center bg-white pb-16 px-14">
          <input
            className="flex-1 text-left h-14 rounded-xl outline-0 text-gray700 placeholder:text-textgray bg-lightgray font-semibold text-sm px-4 mr-2"
            placeholder={placeholder}
            value={data}
            onChange={handleInput}
          />
          <button className="w-24 h-14 rounded-xl bg-skyblue text-primary font-bold">
            검색
          </button>
        </div>
        <div className="bg-white px-12 pb-14">
          <div className="text-gray500 text-lg font-semibold pb-10">
            추가한 사용자
          </div>
          {userList.length === 0 ? (
            <div className="font-medium text-darkgray text-base text-center">
              목록이 비어있습니다.
            </div>
          ) : (
            <div className="flex flex-col items-center justidy-center">
              {userList.map((item) => (
                <AdminUserItem key={item.username} {...item} />
              ))}
            </div>
          )}
        </div>
        <div className="flex">
          <button
            className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
            onClick={closeModal}
          >
            {noText}
          </button>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
            onClick={yesHandler}
          >
            {yesText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(AddUserModal);
