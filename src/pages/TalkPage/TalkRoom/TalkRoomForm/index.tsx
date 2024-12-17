import clsx from "clsx";
import {
  Dispatch,
  FormEvent,
  memo,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

interface Props {
  sendMessageHandler: (message: string) => void;
  setShowImageModal: Dispatch<SetStateAction<boolean>>;
  isBlock: boolean;
  isBlocked: boolean;
}

function TalkRoomForm({
  sendMessageHandler,
  setShowImageModal,
  isBlock,
  isBlocked,
}: Props) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const chatPlaceholder = useMemo(() => {
    if (isBlock) return "차단한 상대와 대화가 불가능합니다.";
    if (isBlocked) return "상대에게 차단되어 대화가 불가능합니다.";
    return "메시지를 입력해주세요.";
  }, [isBlock, isBlocked]);

  const submitHandler = useCallback(
    (e?: FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault();
      if (message.trim() === "") return;

      sendMessageHandler(message);
      setMessage("");

      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    },
    [message, sendMessageHandler]
  );

  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submitHandler();
      }
    },
    [submitHandler]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        textareaRef.current
      ) {
        textareaRef.current.blur();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={submitHandler} ref={formRef}>
      <div className="flex items-center px-3">
        <button
          type="button"
          className="p-1 text-primary focus:outline-none"
          onClick={() => setShowImageModal(true)}
          disabled={isBlock || isBlocked}
        >
          <svg
            aria-hidden="true"
            className="w-7 h-7"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <textarea
          ref={textareaRef}
          className={clsx(
            "block mx-2 p-2.5 w-full text-sm text-black bg-white rounded-lg border border-mediumgray focus:outline-none focus:border-primary",
            "resize-none overflow-y-scroll noScrollBar"
          )}
          placeholder={chatPlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyDownHandler}
          disabled={isBlock || isBlocked}
          style={{
            lineHeight: "20px",
            minHeight: "40px",
            maxHeight: "40px",
          }}
          rows={1}
        />
        <button
          type="submit"
          className={clsx(
            "w-20 h-10 p-2 text-sm rounded-lg",
            !message.trim()
              ? "bg-lightgray text-darkgray"
              : "bg-primary text-white"
          )}
          disabled={!message.trim()}
        >
          전송
        </button>
      </div>
    </form>
  );
}

export default memo(TalkRoomForm);
