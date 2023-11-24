import DriverIntroduction from "./DriverIntroduction";

function Introduction({ modifyMode, driverInfo, setDriverInfo }) {
  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">
        드라이버 자기소개
      </p>
      <div>
        <DriverIntroduction
          modifyMode={modifyMode}
          content={driverInfo.introduction}
          onChangeHandler={(e) =>
            setDriverInfo({
              ...driverInfo,
              introduction: e.target.value.slice(0, 300),
            })
          }
        />
      </div>
    </>
  );
}

export default Introduction;
