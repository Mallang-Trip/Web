import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CONSTANT } from "@/utils/data";
import { RootState } from "@/redux/store";
import closeIcon from "@/assets/svg/x-modal-icon.svg";
import copyIcon from "@/assets/svg/CopyIcon.svg";
import kakaoIcon from "@/assets/images/kakaoIcon.png";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  images: string[];
  name: string;
  introduction: string;
}

function ShareModal({
  showModal,
  setShowModal,
  images,
  name,
  introduction,
}: Props) {
  const Kakao = window.Kakao;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const { driverId } = useParams();
  const [copyComplete, setCopyComplete] = useState(false);

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init("19c42824783a3e9124e67b70847e0ec6");
    }
  }, [Kakao]);

  const copyURL = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopyComplete(true);
    });
  }, []);

  const kakaoShare = useCallback(() => {
    Kakao.Share.sendCustom({
      templateId: 99453,
      templateArgs: {
        IMAGE1: images[0] || CONSTANT.THUMBNAIL_IMAGE,
        IMAGE2: images[1] || null,
        IMAGE3: images[2] || null,
        PROFILE_IMAGE: user.profileImg || CONSTANT.BASE_PROFILE_IMAGE,
        PROFILE_NAME: user.nickname || "말랑트립",
        TITLE: name,
        DESCRIPTION: introduction,
        URL: `driver/profile/${driverId}`,
      },
    });
  }, [Kakao, user, driverId, images, name, introduction]);

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) closeModal();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") closeModal();
  }, []);

  useEffect(() => {
    if (!copyComplete) return;

    setTimeout(() => {
      setCopyComplete(false);
    }, 5000);
  }, [copyComplete]);

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

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
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="relative h-44 whitespace-pre bg-white rounded-xl pl-7 pr-12 py-6">
          <p className="text-xl text-black font-bold">
            공유하기
            <span
              className={clsx(
                "text-sm font-normal ml-10",
                copyComplete ? "text-red-600" : "text-white"
              )}
            >
              링크가 복사되었습니다!
            </span>
          </p>
          <img
            src={closeIcon}
            alt="close"
            className="absolute top-6 right-6 cursor-pointer rounded hover:bg-gray-200"
            onClick={closeModal}
          />

          <div className="mt-5 flex justify-between">
            <button
              className="bg-skyblue rounded-lg py-4 px-9 flex gap-4"
              onClick={copyURL}
            >
              <img src={copyIcon} alt="copy" />
              <span className="text-lg text-primary">링크 복사</span>
            </button>
            <button onClick={kakaoShare}>
              <img src={kakaoIcon} alt="kakao" className="w-16 h-16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ShareModal);
