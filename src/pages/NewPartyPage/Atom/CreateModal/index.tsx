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
import { useNavigate } from "react-router-dom";
import { postNewParty } from "@/api/party";
import { Course, Destination } from "@/types";
import { isGAlive } from "@/utils/ga";
import ReactGA from "react-ga4";
import clsx from "clsx";
import { loadNaverScript } from "@/utils/naverTracking";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  content: string;
  memberCount: number;
  date: string;
  companions: { name: string; phoneNumber: string }[];
  newName?: string;
  planData: Course;
  destinations: Destination[];
  driverId: number;
  region: string;
  startTime?: string;
  endTime?: string;
  promotionId: number;
}

function CreateModal({
  showModal,
  setShowModal,
  content,
  memberCount,
  date,
  companions,
  newName,
  planData,
  destinations,
  driverId,
  region,
  startTime,
  endTime,
  promotionId,
}: Props) {
  const navigation = useNavigate();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [partyId, setPartyId] = useState(-1);

  const createHandler = useCallback(async () => {
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
          ...planData,
          name: newName || planData.name,
          days: [
            {
              ...planData.days[0],
              destinations: destinations.map((item) => item.destinationId),
              startTime: startTime || planData.days[0].startTime,
              endTime: endTime || planData.days[0].endTime,
            },
          ],
          region: planData.region || region,
          totalPrice: planData.days[0].price,
        },
        monopoly: false,
        userPromotionCodeId: promotionId,
      };

      const result = await postNewParty(body);

      if (result.statusCode === 200) {
        if (isGAlive()) {
          ReactGA.event({
            category: "새로운 파티 만들기",
            action: "11_new_suggestionsent",
          });
        }
        setPartyId(result.payload.partyId);
        setMessage(
          "드라이버에게 일정 가입 신청이 완료되었습니다.\n\n드라이버가 승인하면 결과를 알림으로 전송합니다."
        );

        const cleanup = loadNaverScript("lead");
        return cleanup;
      } else setMessage(result.message);

      setComplete(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    content,
    driverId,
    memberCount,
    date,
    companions,
    memberCount,
    planData,
    newName,
    destinations,
    startTime,
    endTime,
    region,
    promotionId,
  ]);

  const closeModal = useCallback(() => {
    if (
      complete &&
      message ===
        "드라이버에게 일정 가입 신청이 완료되었습니다.\n\n드라이버가 승인하면 결과를 알림으로 전송합니다."
    ) {
      if (isGAlive()) {
        ReactGA.event({
          category: "새로운 일정 만들기",
          action: "11_new_suggestionsent",
        });
      }
      navigation(`/party/detail/${partyId}`, { replace: true });
    }

    setShowModal(false);
  }, [complete, message, partyId]);

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
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setComplete(false);
    setMessage(
      "드라이버에게 일정 가입을 제안합니다.\n\n드라이버가 승인할 경우 일정에 가입되며,\n말랑트립 확정 이전까지 예약금은 청구되지 않습니다.\n\n제안을 보내시겠습니까?"
    );

    if (isGAlive()) {
      ReactGA.event({
        category: "새로운 파티 만들기",
        action: "10_new_joinsuggestion",
      });
    }

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

export default memo(CreateModal);
