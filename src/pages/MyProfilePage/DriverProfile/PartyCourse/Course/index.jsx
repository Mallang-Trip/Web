function Course({ courseImg, courseName }) {
  return (
    <div className="relative h-64 cursor-pointer">
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={courseImg}
        alt="party-image"
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl text-white">
        {courseName}
      </div>
    </div>
  );
}

export default Course;