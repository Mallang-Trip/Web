import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { CONSTANT } from "../../../../utils/data";
import closeIcon from "../../../../assets/svg/x-modal-icon.svg";
import copyIcon from "../../../../assets/svg/CopyIcon.svg";
import kakaoIcon from "../../../../assets/images/kakaoIcon.png";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  images: string[] | undefined;
  name: string | undefined;
  destinationId: number | undefined;
}

function ShareModal({
  showModal,
  setShowModal,
  images,
  name,
  destinationId,
}: Props) {
  const Kakao = window.Kakao;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [copyComplete, setCopyComplete] = useState(false);

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init("19c42824783a3e9124e67b70847e0ec6");
    }
  }, []);

  const copyURL = useCallback(() => {
    navigator.clipboard
      .writeText(
        window.location.origin + `/destination/detail/${destinationId}`
      )
      .then(() => {
        setCopyComplete(true);
      });
  }, [destinationId]);

  const kakaoShare = useCallback(() => {
    Kakao.Share.sendCustom({
      templateId: 99453,
      templateArgs: {
        IMAGE1: (images && images[0]) || CONSTANT.THUMBNAIL_IMAGE,
        IMAGE2: (images && images[1]) || null,
        IMAGE3: (images && images[2]) || null,
        PROFILE_IMAGE: user.profileImg || CONSTANT.BASE_PROFILE_IMAGE,
        PROFILE_NAME: user.nickname || "말랑트립",
        TITLE: name,
        DESCRIPTION: `${name}에 방문해보세요!`,
        URL: `destination/detail/${destinationId}`,
      },
    });
  }, [user, images, name, destinationId]);

  useEffect(() => {
    if (!copyComplete) return;

    setTimeout(() => {
      setCopyComplete(false);
    }, 5000);
  }, [copyComplete]);

  return (
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
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
            onClick={() => setShowModal(false)}
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
