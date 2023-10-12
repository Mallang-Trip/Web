function DriverProfile({ profileImg, name, driverId }) {
  return (
    <div
      className="relative h-64 cursor-pointer border border-darkgray rounded-lg"
      onClick={() => alert("현재 여기까지 개발 완료")}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={profileImg}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex flex-col items-center justify-between w-full h-full p-3 text-base text-darkgray">
        <div>{name}</div>
        <button
          className="h-8 text-white rounded-full text-xs w-24 bg-primary"
          onClick={(e) => {
            e.stopPropagation();
            console.log(driverId);
            alert("현재 여기까지 개발 완료");
          }}
        >
          프로필 보기
        </button>
      </div>
    </div>
  );
}

export default DriverProfile;
