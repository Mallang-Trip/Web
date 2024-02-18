function TalkRoomWrapper({ children }) {
  return (
    <div
      className="flex flex-col justify-between gap-3 h-full pb-3 px-1 bg-white rounded-lg border border-mediumgray m-3 z-50 relative"
      style={{
        height: `calc(100% - 24px)`,
      }}
    >
      {children}
    </div>
  );
}

export default TalkRoomWrapper;
