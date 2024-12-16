import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { getUserInfo } from "../../api/users";
import ModalCloser from "./ModalCloser";
import ButtonBox from "./ButtonBox";
import ProfileInfo from "./ProfileInfo";
import Loading from "../Loading";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  userId?: number;
  chatRoomId?: number;
  reportId?: number;
  driverName: string | boolean;
}

function ProfileModal({
  showModal,
  setShowModal,
  userId = -1,
  chatRoomId,
  reportId,
  driverName,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const $body = useMemo(() => document.body, []);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: undefined,
    profileImg: undefined,
    nickname: undefined,
    introduction: undefined,
    createdAt: undefined,
    suspensionDuration: undefined,
  });

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(({ target }: MouseEvent) => {
    if (modalRef.current === target) closeModal();
  }, []);

  const handleKeyPress = useCallback(({ key }: KeyboardEvent) => {
    if (key === "Escape") closeModal();
  }, []);

  const getUserInfoFunc = useCallback(async () => {
    if (userId === -1) return;

    setLoading(true);

    try {
      const result = await getUserInfo(userId);
      setUserInfo(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!showModal) return;

    getUserInfoFunc();

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal, userId]);

  return createPortal(
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
      id="user-profile-modal"
    >
      <div className="m-auto shadow w-96 bg-white rounded-xl">
        <ModalCloser closeModal={() => setShowModal(false)} />
        {loading ? (
          <div className="w-full h-[344px] flex justify-center items-center">
            <Loading full={false} />
          </div>
        ) : (
          <>
            <ProfileInfo {...userInfo} driverName={driverName} />
            <ButtonBox
              userId={userInfo.userId}
              nickname={userInfo.nickname}
              setShowModal={setShowModal}
              chatRoomId={chatRoomId}
              reportId={reportId}
              suspensionDuration={userInfo.suspensionDuration}
              getUserInfoFunc={getUserInfoFunc}
            />
          </>
        )}
      </div>
    </div>,
    $body
  );
}

export default memo(ProfileModal);
