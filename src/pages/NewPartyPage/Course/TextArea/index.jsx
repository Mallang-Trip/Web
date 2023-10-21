function TextArea({ title, content }) {
  return (
    <div className="my-6">
      <p className="text-lg font-bold">{title}</p>
      <p className="text-sm text-darkgray">{content}</p>
    </div>
  );
}

export default TextArea;
