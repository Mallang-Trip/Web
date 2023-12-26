import { useState } from "react";

function TalkRoomForm({ sendMessageHandler, setShowImageModal }) {
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (message === "") return;

    sendMessageHandler(message);
    setMessage("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex items-center px-3">
        <button
          type="button"
          className="p-1 text-primary focus:outline-none"
          onClick={() => setShowImageModal(true)}
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
        <input
          type="text"
          className="block mx-2 p-2.5 w-full text-sm text-black bg-white rounded-lg border border-[#D9D9D9] focus:outline-none focus:border-primary"
          placeholder="메시지를 입력해주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className={`w-20 h-10 p-2 text-sm rounded-lg ${
            !message ? "bg-[#F4F4F4] text-darkgray" : "bg-primary text-white"
          }`}
          disabled={!message}
        >
          전송
        </button>
      </div>
    </form>
  );
}

export default TalkRoomForm;
