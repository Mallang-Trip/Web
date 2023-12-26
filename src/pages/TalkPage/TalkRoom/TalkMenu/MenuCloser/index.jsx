import closeIcon from "../../../../../assets/svg/x-modal-icon.svg";

function MenuCloser({ setShowMenu }) {
  return (
    <img
      src={closeIcon}
      alt="close"
      className="absolute top-6 right-6 cursor-pointer rounded hover:bg-gray-200"
      onClick={() => setShowMenu(false)}
    />
  );
}

export default MenuCloser;
