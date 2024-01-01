function SuggestButton({ suggestHandler }) {
  return (
    <div className="flex justify-center my-20">
      <button
        className="mx-auto h-12 text-white rounded-full text-lg w-64 md:w-80 bg-primary"
        onClick={suggestHandler}
      >
        제안 보내기
      </button>
    </div>
  );
}

export default SuggestButton;
