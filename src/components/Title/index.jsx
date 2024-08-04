function Title({ title, className }) {
  return (
    <p className={`text-2xl text-black font-bold ${className}`}>{title}</p>
  );
}

export default Title;
