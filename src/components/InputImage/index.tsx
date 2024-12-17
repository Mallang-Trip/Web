import { ForwardedRef, memo, MouseEvent, useCallback, useState } from "react";
import { isIos } from "@/utils";
import { ConfirmModal } from "@/components";

interface Props {
  id?: string;
  inputRef?: ForwardedRef<HTMLInputElement>;
  className?: string;
  onChange: () => void;
}

function InputImage({ id, inputRef, className, onChange }: Props) {
  const [isBlocked, setIsBlocked] = useState(isIos());
  const [showModal, setShowModal] = useState(false);

  const onClickHandler = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      if (!isBlocked) return;
      event.preventDefault();
      setShowModal(true);
      setIsBlocked(false);
    },
    [isBlocked]
  );

  return (
    <>
      <input
        ref={inputRef}
        className={className}
        id={id}
        type="file"
        accept="image/*"
        onChange={onChange}
        onClick={onClickHandler}
      />
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={
          "말랑트립 앱은 사용자들이 커뮤니티, 리뷰 등\n게시글과 댓글을 통해 유용한 정보를\n공유하고 소통할 수 있도록\n사진 촬영 기능을 제공합니다.\n사용자가 직접 선택하여 촬영한 사진은\n게시물 작성, 프로필 등록 시 첨부할 수 있으며,\n해당 기능은 여행 경험 공유와\n정보 제공을 목적으로 사용됩니다."
        }
      />
    </>
  );
}

export default memo(InputImage);
