function PartyImageBox({ images, name }) {
  return (
    <div className="grid grid-cols-2 mt-2">
      <img className="object-cover rounded-l-3xl" src={images[0]} alt={name} />
      <div className="grid grid-cols-2">
        <img className="object-cover" src={images[1] || images[0]} alt={name} />
        <img
          className="rounded-tr-3xl object-cover"
          src={images[2] || images[0]}
          alt={name}
        />
        <img className="object-cover" src={images[3] || images[0]} alt={name} />
        <img
          className="rounded-br-3xl object-cover"
          src={images[4] || images[0]}
          alt={name}
        />
      </div>
    </div>
  );
}

export default PartyImageBox;
