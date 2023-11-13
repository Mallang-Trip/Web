import { useEffect } from "react";

function Introduction({ setActiveNext, introduction, setIntroduction }) {
  useEffect(() => {
    setActiveNext(true);
  }, []);

  return (
    <div className="w-full mt-28 h-48 border border-black ring-1 ring-black rounded-2xl p-6 relative">
      <textarea
        className="w-full h-32 text-black text-sm placeholder:text-darkgray focus:outline-none resize-none overflow-hidden"
        placeholder="(선택 사항)자기소개를 300자 이내로 입력해주세요"
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value.slice(0, 300))}
      />

      <div className="absolute bottom-0 left-0 w-full px-6 pb-3 flex justify-end text-primary">
        {`${introduction.length}/300`}
      </div>
    </div>
  );
}

export default Introduction;
