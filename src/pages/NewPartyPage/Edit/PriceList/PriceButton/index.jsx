function PriceButton({ price, hours, planData, setPlanData }) {
  const clickHandler = () => {
    setPlanData({
      ...planData,
      totalPrice: price,
      days: [{ ...planData.days[0], price: price, hours: hours }],
    });
  };

  return (
    <button
      className={`whitespace-pre w-fit h-8 px-5 text-sm border rounded-full focus:outline-none cursor-pointer ${
        planData.days[0].price === price && planData.days[0].hours === hours
          ? "bg-primary text-white border-primary"
          : "bg-white text-darkgray border-darkgray"
      }`}
      onClick={clickHandler}
    >
      {hours}시간 {price}원
    </button>
  );
}

export default PriceButton;
