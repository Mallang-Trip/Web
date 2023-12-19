import Button from "./Button";

function ButtonBox() {
  return (
    <div className="flex justify-center flex-wrap gap-3 mb-12">
      <Button name="채팅하기" />
      <Button name="신고하기" />
      <Button name="차단하기" />
    </div>
  );
}

export default ButtonBox;
