function DayButton({ weekly, setWeekly, eng, kor }) {
  const clickHandler = () => {
    let newWeekly = [...weekly];

    if (weekly.includes(eng)) {
      newWeekly = newWeekly.filter((item) => item !== eng);
      setWeekly(newWeekly);
    } else {
      newWeekly.push(eng);
      setWeekly(newWeekly);
    }
  };

  return (
    <button
      className={`w-10 h-10 rounded-full ${
        weekly.includes(eng)
          ? "bg-skyblue text-primary"
          : "bg-[#F4F4F4] text-darkgray"
      }`}
      onClick={clickHandler}
    >
      {kor}
    </button>
  );
}

export default DayButton;
