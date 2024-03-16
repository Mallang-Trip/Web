import { useEffect, useRef, useState } from "react";
import { getLikeParty, getPartyList } from "../../../../../api/party";
import PartyModalTab from "./PartyModalTab";
import HeartList from "./HeartList";
import NoPartyButton from "./NoPartyButton";
import ReservationList from "./ReservationList";

function PartyModal({ showModal, setShowModal, setSelectedParty }) {
  const modalRef = useRef();
  const [isTabHeart, setIsTabHeart] = useState(true);
  const [myHeartData, setMyHeartData] = useState([]);
  const [myReservationData, setMyReservationData] = useState([]);

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  const getMyHeartData = async () => {
    try {
      const result = await getLikeParty();
      setMyHeartData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  const getReservationData = async () => {
    try {
      const result = await getPartyList("all", ["all", "all"], 1, 1010000);
      setMyReservationData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  const selectPartyHandler = (party) => {
    setSelectedParty(party);
    setShowModal(false);
  };

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
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div className="m-auto shadow w-full max-w-[800px] h-[700px] px-8 py-9 bg-white rounded-lg relative">
        <p className="text-xl text-black font-bold">파티 선택</p>
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

export default PartyModal;
