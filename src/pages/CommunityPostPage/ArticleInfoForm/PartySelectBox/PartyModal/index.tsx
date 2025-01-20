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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { HeartParty } from "@/types";
import { getLikeParty, getMyDriverParty, getMyParty } from "@/api/party";
import PartyModalTab from "./PartyModalTab";
import HeartList from "./HeartList";
import NoPartyButton from "./NoPartyButton";
import ReservationList from "./ReservationList";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setSelectedParty: Dispatch<SetStateAction<{ name: string; partyId: number }>>;
}

function PartyModal({ showModal, setShowModal, setSelectedParty }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [isTabHeart, setIsTabHeart] = useState(true);
  const [myHeartData, setMyHeartData] = useState<HeartParty[]>([]);
  const [myReservationData, setMyReservationData] = useState<HeartParty[]>([]);

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

  const getMyHeartData = useCallback(async () => {
    try {
      const result = await getLikeParty();
      setMyHeartData(result.payload);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getReservationData = useCallback(async () => {
    try {
      const result =
        user.role === "ROLE_DRIVER"
          ? await getMyDriverParty()
          : await getMyParty();
      setMyReservationData(result.payload);
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  const selectPartyHandler = useCallback(
    (party: { name: string; partyId: number }) => {
      setSelectedParty(party);
      setShowModal(false);
    },
    []
  );

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    getMyHeartData();
    getReservationData();
    setIsTabHeart(true);

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
      <div className="m-auto shadow w-full max-w-[800px] h-[700px] px-8 py-9 bg-white rounded-lg relative">
        <p className="text-xl text-black font-bold">일정 선택</p>
        <button
          type="button"
          className="absolute top-6 right-6 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          onClick={closeModal}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <PartyModalTab isTabHeart={isTabHeart} setIsTabHeart={setIsTabHeart} />
        {isTabHeart ? (
          <HeartList
            myHeartData={myHeartData}
            selectPartyHandler={selectPartyHandler}
          />
        ) : (
          <ReservationList
            myReservationData={myReservationData}
            selectPartyHandler={selectPartyHandler}
          />
        )}
        <NoPartyButton selectPartyHandler={selectPartyHandler} />
      </div>
    </div>
  );
}

export default memo(PartyModal);
