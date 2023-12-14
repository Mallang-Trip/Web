function TalkRoomWrapper({ children }) {
  return (
    <div
      className="flex flex-col justify-between gap-3 pb-2 md:pb-3 px-1 bg-white rounded-lg border border-[#D9D9D9] m-3 z-50"
      style={{
        height: `${
          window.screen.width < 1024
            ? window.screen.height - 24
            : window.screen.height - 222
        }px`,
      }}
    >
      {children}
    </div>
  );
}

export default TalkRoomWrapper;
