function PriceButton({ price, hours, planData, setPlanData }) {
  const clickHandler = () => {
    setPlanData({
      ...planData,
      totalPrice: price,
      days: { ...planData.days, price: price, hours: hours },
    });
  };
  return (
    <button
      className={`w-fit h-8 px-5 text-sm border rounded-full focus:outline-none cursor-pointer ${
        planData.totalPrice !== price
          ? "bg-white text-darkgray border-darkgray"
          : "bg-primary text-white border-primary"
      }`}
      onClick={clickHandler}
    >
      {hours}시간 {price}원
    </button>
  );
}

export default PriceButton;
