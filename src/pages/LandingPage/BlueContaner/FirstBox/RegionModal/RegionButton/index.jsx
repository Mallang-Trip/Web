function RegionButton({ image, name, price, regionClickHandler }) {
  return (
    <div
      className="relative h-64 cursor-pointer"
      onClick={() => regionClickHandler(name)}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-xl text-white">
        <div>{name}</div>
        <div>{price}</div>
      </div>
    </div>
  );
}

export default RegionButton;
