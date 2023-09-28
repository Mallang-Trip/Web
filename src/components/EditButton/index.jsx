import pencil from "../../assets/svg/pencil.svg";

function EditButton({ className, onClick, title }) {
  return (
    <button
      className={`flex justify-between items-center gap-2 px-4 py-3 bg-skyblue rounded-xl border border-primary focus:outline-none ${className}`}
      onClick={() => onClick()}
    >
      <img src={pencil} alt="edit" />
      <span className="text-sm text-primary">{title}</span>
    </button>
  );
}

export default EditButton;
