function ExitButton({ chatRoomId }) {
  return (
    <button
      className="absolute bottom-0 left-0 w-full bg-skyblue text-primary py-4"
      onClick={() => console.log(chatRoomId)}
    >
      말랑톡 나가기
    </button>
  );
}

export default ExitButton;
