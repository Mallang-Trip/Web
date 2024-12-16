import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import ConfirmModal from "../../../../components/ConfirmModal";
import clsx from "clsx";

interface Props {
  showSearchMap: boolean;
  setShowSearchMap: Dispatch<SetStateAction<boolean>>;
  canToggle: boolean;
}

function ToggleButton({ showSearchMap, setShowSearchMap, canToggle }: Props) {
  const [showModal, setShowModal] = useState(false);

  const toggleHandler = useCallback(
    (isSearchMode: boolean) => {
      if (!canToggle) return setShowModal(true);
      setShowSearchMap(isSearchMode);
    },
    [canToggle]
  );

  return (
    <>
      <div className="mt-14 mb-7 w-72 mx-auto flex justify-between border border-primary rounded-full relative">
        <button
          className={clsx(
            "w-36 py-3 text-center text-sm transform duration-500",
            showSearchMap ? "text-white" : "text-darkgray"
          )}
          onClick={() => toggleHandler(true)}
        >
          여행지 검색
        </button>
        <button
          className={clsx(
            "w-36 py-3 text-center text-sm transform duration-500",
            showSearchMap ? "text-darkgray" : "text-white"
          )}
          onClick={() => toggleHandler(false)}
        >
          여행 코스
        </button>
        <div
          className={clsx(
            "w-36 h-full absolute top-0 left-0 -z-10 bg-primary rounded-full transform duration-500",
            showSearchMap ? "translate-x-0" : "translate-x-36"
          )}
        />
      </div>
      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message="여행지를 추가해주세요."
      />
    </>
  );
}

export default memo(ToggleButton);
