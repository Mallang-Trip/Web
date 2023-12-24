import Plus from "../../../../assets/svg/plus.svg";

function NewTalkButton() {
  return (
    <button
      type="button"
      className="animate-bounce flex items-center justify-center absolute bottom-40 md:bottom-28 right-8 bg-primary rounded-full w-14 h-14 focus:outline-none"
      onClick={() => console.log("new chat")}
    >
      <img src={Plus} alt="new_party" className="w-9 h-9" />
    </button>
  );
}

export default NewTalkButton;
