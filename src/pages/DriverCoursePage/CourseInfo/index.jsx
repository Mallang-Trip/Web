function CourseInfo({ title, content }) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <div className="text-lg text-black font-bold">{title}</div>
      <div className="text-sm text-darkgray font-medium">{content}</div>
    </div>
  );
}

export default CourseInfo;
