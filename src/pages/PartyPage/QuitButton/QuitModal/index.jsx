import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteQuitParty,
  deleteQuitReservationParty,
} from "../../../../api/party";
import { computeGapDay, priceToString } from "../../../../utils";
import Loading from "../../../../components/Loading";

function QuitModal({
  showModal,
  setShowModal,
  getPartyData,
  partyStatus,
  startDate,
  paymentAmount,
}) {
  const modalRef = useRef();
  const { partyId } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const chargeMoney = () => {
    const gapDay = computeGapDay(startDate);

    if (gapDay >= 8) return 0;
    if (gapDay === 7) return 10;
    if (gapDay === 6) return 25;
    if (gapDay === 5) return 50;
    if (gapDay === 4) return 75;
    if (gapDay === 3) return 90;
    else return 100;
  };

  const quitParty = async () => {
    if (loading) return;

    try {
      setLoading(true);

      if (partyStatus === "SEALED") await deleteQuitReservationParty(partyId);
      else await deleteQuitParty(partyId);

      setTimeout(() => {
        if (partyStatus === "SEALED")
          setMessage(
            <div>
              예약을 취소하였습니다.
              <br />
              <br />
              환급금{" "}
              <span className="text-primary">
                {priceToString(
                  Math.floor(((100 - chargeMoney()) / 100) * paymentAmount)
                )}
              </span>
              원은 3영업일 내에 지급될 예정입니다.
            </div>
          );
        else setMessage("파티를 탈퇴하였습니다.");

        setLoading(false);
        setComplete(true);
      }, 3000);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (loading) return;
    if (complete) getPartyData(true);
    setShowModal(false);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
    else if (event.key === "Enter") {
      if (!complete) quitParty();
      else closeModal();
    }
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setComplete(false);
    setLoading(false);

    if (partyStatus === "SEALED")
      setMessage(
        <div>
          예약을 취소하시겠습니까?
          <br />
          <br />
          지금 예약을 취소할 시<br />
          <br />
          위약금은{" "}
          <span className="text-primary">
            {priceToString(Math.floor((chargeMoney() / 100) * paymentAmount))}
          </span>
          원이며,
          <br />
          환급금은 총{" "}
          <span className="text-primary">
            {priceToString(
              Math.floor(((100 - chargeMoney()) / 100) * paymentAmount)
            )}
          </span>
          원입니다.
        </div>
      );
    else setMessage("파티를 탈퇴하시겠습니까?");

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
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col justify-center h-64 text-center text-black whitespace-pre bg-white rounded-t-xl">
          {loading ? <Loading /> : message}
        </div>
        {!complete ? (
          <div className="flex">
            <button
              className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-[#F4F4F4]"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
              onClick={quitParty}
            >
              확인
            </button>
          </div>
        ) : (
          <button
            className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
            onClick={closeModal}
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
}

export default QuitModal;
