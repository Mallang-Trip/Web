import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postPartyJoin, putPartyCourse } from "../../../api/party";
import { priceToString } from "../../../utils";

function EditModal({
  showModal,
  setShowModal,
  content,
  memberCount,
  companions,
  getPartyData,
  capacity,
  headcount,
  totalPrice,
  partyName,
  course,
  myParty,
  courseData,
  cardId,
}) {
  const navigation = useNavigate();
  const modalRef = useRef();
  const { partyId } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const isMemberFull = headcount + memberCount === capacity;

  const editPartyHandler = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const body = myParty
        ? {
            content: "",
            course: {
              ...course,
              days: [
                {
                  ...course.days[0],
                  destinations: courseData.map((item) => item.destinationId),
                },
              ],
            },
          }
        : {
            changeCourse: true,
            content: content,
            headcount: memberCount,
            cardId: cardId,
            companions: companions.slice(0, memberCount - 1).map((member) => {
              return {
                ...member,
                phoneNumber: member.phoneNumber.replace(/-/g, ""),
              };
            }),
            newCourse: {
              ...course,
              days: [
                {
                  ...course.days[0],
                  destinations: courseData.map((item) => item.destinationId),
                },
              ],
            },
          };

      myParty
        ? await putPartyCourse(partyId, body)
        : await postPartyJoin(partyId, body);

      setMessage(
        <div>
          파티원들에게 제안을 보냈습니다.
          <br />
          <br />
          다음 페이지에서
          <br />
          파티원들의 제안 승낙 여부를 확인할 수 있습니다.
          {!myParty && (
            <>
              <br />
              <br />
              24시간 내 전원 동의할 경우
              <br />
              즉시 파티에 가입하게 됩니다.
            </>
          )}
        </div>
      );
      setComplete(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (complete) {
      navigation(-1, { replace: true });
      getPartyData(true);
    }

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

    if (!myParty && isMemberFull)
      setMessage(
        <div>
          <span className="text-primary">[{partyName}]</span>
          <br />
          <br />
          파티원들이 24시간 이내에 변경 제안을
          <br />
          전원 승인하게 되면 파티에 즉시 가입됩니다.
          <br />
          <br />
          파티에 가입하는 즉시
          <br />
          <span className="text-primary">
            {priceToString(
              Math.floor((memberCount * totalPrice) / (headcount + memberCount))
            )}
          </span>
          원 예약금 결제가 진행되며
          <br />
          파티원 모두 예약이 확정됩니다.
          <br />
          <br />
          파티원들에게 제안을 보내시겠습니까?
        </div>
      );
    else
      setMessage(
        <div>
          <span className="text-primary">[{partyName}]</span>
          <br />
          <br />
          제안을 확정하기 위해 24시간 내로
          <br />
          드라이버와 여행자들의 동의를 구합니다.
          <br />
          <br />
          {myParty
            ? "24시간 내 전원 동의 즉시 변경안이 확정됩니다."
            : "24시간 내 전원 동의 즉시 파티에 가입하게 됩니다."}
          <br />
          <br />
          파티원들에게 제안을 보내시겠습니까?
        </div>
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
        <div className="flex flex-col justify-center h-80 text-center text-black whitespace-pre bg-white rounded-t-xl">
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
              onClick={editPartyHandler}
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

export default EditModal;
