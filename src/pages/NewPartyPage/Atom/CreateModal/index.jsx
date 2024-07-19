import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postNewParty } from "../../../../api/party";

function CreateModal({
  showModal,
  setShowModal,
  content,
  memberCount,
  date,
  companions,
  name,
  newName,
  course,
  courseData,
  driverId,
  region,
  courseRegion,
  totalPrice,
}) {
  const navigation = useNavigate();
  const modalRef = useRef();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [partyId, setPartyId] = useState(-1);

  const createHandler = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const body = {
        content: content,
        driverId: driverId,
        headcount: memberCount,
        startDate: date,
        endDate: date,
        companions: companions.slice(0, memberCount - 1).map((member) => {
          return {
            ...member,
            phoneNumber: member.phoneNumber.replace(/-/g, ""),
          };
        }),
        course: {
          ...course,
          name: newName || name,
          days: [
            {
              ...course.days[0],
              destinations: courseData.map((item) => item.destinationId),
            },
          ],
          region: courseRegion || region,
        },
        totalPrice: totalPrice,
      };

      const result = await postNewParty(body);

      if (result.statusCode === 200) {
        setPartyId(result.payload.partyId);
        setMessage(
          "드라이버에게 파티 가입 신청이 완료되었습니다.\n\n드라이버가 승인하면 결과를 알림으로 전송합니다."
        );
      } else setMessage(result.message);

      setComplete(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (
      complete &&
      message ===
        "드라이버에게 파티 가입 신청이 완료되었습니다.\n\n드라이버가 승인하면 결과를 알림으로 전송합니다."
    )
      navigation(`/party/detail/${partyId}`, { replace: true });

    setShowModal(false);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setComplete(false);
    setMessage(
      "드라이버에게 파티 가입을 제안합니다.\n\n드라이버가 승인할 경우 파티에 가입되며,\n말랑트립 확정 이전까지 예약금은 청구되지 않습니다.\n\n제안을 보내시겠습니까?"
    );

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
          {message}
        </div>
        {!complete ? (
          <div className="flex">
            <button
              className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
              onClick={createHandler}
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

export default CreateModal;
