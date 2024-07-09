function ServiceRegion({ region }) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">서비스 지역</p>
      <p className="text-sm text-darkgray font-medium">
        {Array.isArray(region) && region.join(" ")}
      </p>
    </div>
  );
}

export default ServiceRegion;
