function RegionButton({ image, name, regionClickHandler }) {
  return (
    <div
      className="relative h-44 md:h-52 cursor-pointer"
      onClick={() => regionClickHandler(name)}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl text-white">
        {name}
      </div>
    </div>
  );
}

export default RegionButton;
