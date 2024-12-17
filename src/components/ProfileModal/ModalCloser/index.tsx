import { memo } from "react";
import closeIcon from "@/assets/svg/x-modal-icon.svg";

interface Props {
  closeModal: () => void;
}

function ModalCloser({ closeModal }: Props) {
  return (
    <div className="relative">
      <img
        src={closeIcon}
        alt="close-modal"
        className="absolute top-6 right-6 cursor-pointer rounded hover:bg-gray-200"
        onClick={closeModal}
      />
    </div>
  );
}

export default memo(ModalCloser);
