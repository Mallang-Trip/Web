function Region({ region, image, name, regionHandler }) {
  return (
    <div
      className={`relative h-64 cursor-pointer rounded-lg ${
        region.includes(name) && "ring ring-primary"
      }`}
      onClick={() => regionHandler(name)}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-xl text-white z-10">
        <div>{name}</div>
      </div>
      {region.includes(name) ? (
        <div className="absolute top-0 left-0 w-full h-full bg-primary rounded-lg opacity-50" />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 rounded-lg" />
      )}
    </div>
  );
}

export default Region;
