function DriverIntroduction({ content, onChangeHandler }) {
  return (
    <div className="py-4 px-6 rounded-xl whitespace-nowrap text-sm relative text-primary bg-skyblue">
      <textarea
        className="w-full h-28 focus:outline-none resize-none overflow-hidden bg-skyblue"
        placeholder="(선택 사항)자기소개를 300자 이내로 입력해주세요"
        value={content}
        onChange={onChangeHandler}
      />
      <div className="absolute bottom-0 left-0 w-full px-6 pb-3 flex justify-end text-primary">
        {`${content.length}/300`}
      </div>
    </div>
  );
}

export default DriverIntroduction;
