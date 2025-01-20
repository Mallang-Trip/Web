import { memo } from "react";

interface Props {
  selectPartyHandler: (party: { name: string; partyId: number }) => void;
}

function NoPartyButton({ selectPartyHandler }: Props) {
  return (
    <div className="flex justify-center mt-9">
      <button
        className="bg-white text-darkgray border-darkgray border text-lg px-5 py-1.5 rounded-full w-64 md:w-80 h-12"
        onClick={() =>
          selectPartyHandler({
            name: "선택해주세요.",
            partyId: -1,
          })
        }
      >
        일정 선택 취소
      </button>
    </div>
  );
}

export default memo(NoPartyButton);
