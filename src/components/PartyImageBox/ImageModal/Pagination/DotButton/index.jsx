function DotButton({ imageIdx, setImageIdx, thisIdx }) {
  return (
    <button
      className={`w-3 h-3 rounded-full ${
        imageIdx === thisIdx ? "bg-primary" : "bg-white"
      }`}
      onClick={() => setImageIdx(thisIdx)}
    />
  );
}

export default DotButton;
