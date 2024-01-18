function TextArea({ title, content }) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">{title}</p>
      <p className="text-sm text-darkgray font-medium">{content}</p>
    </div>
  );
}

export default TextArea;
