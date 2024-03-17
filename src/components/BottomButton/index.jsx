function BottomButton({ text, onClick }) {
  return (
    <div className="w-full block md:hidden fixed left-0 bottom-0 z-50">
      <div className="w-full h-8 bg-gradient-to-t from-white to-white/0"></div>
      <div className="w-full px-5 pb-5 bg-white">
        <button
          className="w-full h-12 bg-primary text-white text-sm text-bold rounded-lg"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    </div>
  );
}

export default BottomButton;
